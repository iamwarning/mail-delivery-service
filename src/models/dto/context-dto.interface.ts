export interface ContextDto {
  [name: string]:
    | any
    | string
    | number
    | boolean
    | Array<string>
    | Array<number>;
}
