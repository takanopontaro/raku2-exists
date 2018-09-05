declare namespace Raku2Exists {
  type Options = {
    cwd?: string;
  };
  export const every: (
    src: string | string[],
    options?: Raku2Exists.Options
  ) => Promise<boolean>;
  export const some: (
    src: string | string[],
    options?: Raku2Exists.Options
  ) => Promise<boolean>;
}

export = Raku2Exists;
