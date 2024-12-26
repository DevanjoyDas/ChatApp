import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    message : i.entity({
      body : i.string(),
      isOpponent : i.boolean(),
      messageStatus : i.string()
    })
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
