export type Callbacks<A> = {
    [name in keyof A]: ((arg: A[name]) => void);
};

export type CallbacksOpt<A> = Partial<Callbacks<A>>;
