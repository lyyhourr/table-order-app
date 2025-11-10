export type TBaseFormProps<TSchema, TData> = {
  data: TData | null;
  handleSubmit: (payload: TSchema) => void;
  onClose?: () => void;
};

export type TBaseSelect = {
  id: number;
  name: string;
};
