export type Actions<A> = {
    [name in keyof A]: ((arg: A[name]) => void);
};

export type ActionsOpt<A> = Partial<Actions<A>>;
