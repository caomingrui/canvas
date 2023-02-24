

export const createWork = (f, functionRecord  = {}) => {
    if (!f) throw new Error('f Cannot be empty');
    if (f instanceof Worker) return f;
    if (typeof f === 'string' && f.endsWith('.js')) {
        return new Worker(f);
    }

    const functionBody = Object.keys(functionRecord).reduce((o, i) => o.concat(functionRecord[i].toString()), []);
    const blob = new Blob([
        `${functionBody.join(';')};
        self.fn = ${f.toString()};
        self.onmessage = ({data}) => {
            const fnData = self.fn(data)
            self.postMessage(fnData)
        }`
    ], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    worker.cleanup = function () {
        URL.revokeObjectURL(url);
        worker.terminate();
    }

    return worker;

}



export default function connectWorker (fn, args, fnOption) {
    let worker = createWork(fn, fnOption);

    worker.postMessage(args);

    let resolve: (data: unknown) => void , reject: (data: unknown) => void;
    const promise = new Promise((x, y) => { resolve = x; reject = y; });

    worker.onmessage = ({data}) => {
        if (worker.cleanup) worker.cleanup();
        resolve(data);
    }

    worker.onerror = ({message}) => {
        if (worker.cleanup) worker.cleanup();
        reject(message);
    }

    worker.onmessageerror = (e) => {
        if (worker.cleanup) worker.cleanup();
        reject(e);
    };

    return promise;
}
