/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface AsyncIterator<T> {
  next(): Promise<T>;
}
