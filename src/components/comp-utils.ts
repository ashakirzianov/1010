export type Actions<A> = {
    [name in keyof A]?: ((arg: A[name]) => void);
};
