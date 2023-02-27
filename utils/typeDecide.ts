
export const isTextChild = (children: unknown): children is string => {

    return typeof children === 'string';
}