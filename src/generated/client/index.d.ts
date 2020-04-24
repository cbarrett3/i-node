import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Query Engine version: 2fb8f444d9cdf7c0beee7b041194b42d7a9ce1e6
 * Prisma Client JS version: 2.0.0-beta.3
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  datasources?: Datasources

  /**
   * @default "pretty"
   */
  errorFormat?: ErrorFormat

  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }

  /**
   * Useful for pgbouncer
   */
  forceTransactions?: boolean
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Comments
 * const comments = await prisma.comment.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Comments
   * const comments = await prisma.comment.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // Fetch all entries from the `User` table
   * const result = await prisma.raw`SELECT * FROM User;`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User;')
   * 
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const userId = '1'
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${userId};`
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): CommentDelegate;

  /**
   * `prisma.comment_Clap`: Exposes CRUD operations for the **Comment_Clap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comment_Claps
    * const comment_Claps = await prisma.comment_Clap.findMany()
    * ```
    */
  get comment_Clap(): Comment_ClapDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;

  /**
   * `prisma.post_Clap`: Exposes CRUD operations for the **Post_Clap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Post_Claps
    * const post_Claps = await prisma.post_Clap.findMany()
    * ```
    */
  get post_Clap(): Post_ClapDelegate;

  /**
   * `prisma.post_Tag`: Exposes CRUD operations for the **Post_Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Post_Tags
    * const post_Tags = await prisma.post_Tag.findMany()
    * ```
    */
  get post_Tag(): Post_TagDelegate;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): TagDelegate;

  /**
   * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follow.findMany()
    * ```
    */
  get follow(): FollowDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]


export declare const role_enum: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export declare type role_enum = (typeof role_enum)[keyof typeof role_enum]



/**
 * Model Comment
 */

export type Comment = {
  created_at: Date | null
  author_id: number
  content: string | null
  id: number
  post_id: number
}

export type CommentSelect = {
  created_at?: boolean
  author_id?: boolean
  content?: boolean
  id?: boolean
  post_id?: boolean
  author?: boolean | UserArgs
  post?: boolean | PostArgs
  comment_claps?: boolean | FindManyComment_ClapArgs
}

export type CommentInclude = {
  author?: boolean | UserArgs
  post?: boolean | PostArgs
  comment_claps?: boolean | FindManyComment_ClapArgs
}

export type CommentGetPayload<
  S extends boolean | null | undefined | CommentArgs,
  U = keyof S
> = S extends true
  ? Comment
  : S extends undefined
  ? never
  : S extends FindManyCommentArgs
  ? 'include' extends U
    ? Comment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> :
      P extends 'post'
      ? PostGetPayload<S['include'][P]> :
      P extends 'comment_claps'
      ? Array<Comment_ClapGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Comment ? Comment[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> :
      P extends 'post'
      ? PostGetPayload<S['select'][P]> :
      P extends 'comment_claps'
      ? Array<Comment_ClapGetPayload<S['select'][P]>> : never
    }
  : Comment
: Comment


export interface CommentDelegate {
  /**
   * Find zero or one Comment.
   * @param {FindOneCommentArgs} args - Arguments to find a Comment
   * @example
   * // Get one Comment
   * const comment = await prisma.comment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCommentArgs>(
    args: Subset<T, FindOneCommentArgs>
  ): CheckSelect<T, CommentClient<Comment | null>, CommentClient<CommentGetPayload<T> | null>>
  /**
   * Find zero or more Comments.
   * @param {FindManyCommentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Comments
   * const comments = await prisma.comment.findMany()
   * 
   * // Get first 10 Comments
   * const comments = await prisma.comment.findMany({ first: 10 })
   * 
   * // Only select the `created_at`
   * const commentWithCreated_atOnly = await prisma.comment.findMany({ select: { created_at: true } })
   * 
  **/
  findMany<T extends FindManyCommentArgs>(
    args?: Subset<T, FindManyCommentArgs>
  ): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>
  /**
   * Create a Comment.
   * @param {CommentCreateArgs} args - Arguments to create a Comment.
   * @example
   * // Create one Comment
   * const user = await prisma.comment.create({
   *   data: {
   *     // ... data to create a Comment
   *   }
   * })
   * 
  **/
  create<T extends CommentCreateArgs>(
    args: Subset<T, CommentCreateArgs>
  ): CheckSelect<T, CommentClient<Comment>, CommentClient<CommentGetPayload<T>>>
  /**
   * Delete a Comment.
   * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
   * @example
   * // Delete one Comment
   * const user = await prisma.comment.delete({
   *   where: {
   *     // ... filter to delete one Comment
   *   }
   * })
   * 
  **/
  delete<T extends CommentDeleteArgs>(
    args: Subset<T, CommentDeleteArgs>
  ): CheckSelect<T, CommentClient<Comment>, CommentClient<CommentGetPayload<T>>>
  /**
   * Update one Comment.
   * @param {CommentUpdateArgs} args - Arguments to update one Comment.
   * @example
   * // Update one Comment
   * const comment = await prisma.comment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CommentUpdateArgs>(
    args: Subset<T, CommentUpdateArgs>
  ): CheckSelect<T, CommentClient<Comment>, CommentClient<CommentGetPayload<T>>>
  /**
   * Delete zero or more Comments.
   * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
   * @example
   * // Delete a few Comments
   * const { count } = await prisma.comment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CommentDeleteManyArgs>(
    args: Subset<T, CommentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Comments.
   * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Comments
   * const comment = await prisma.comment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CommentUpdateManyArgs>(
    args: Subset<T, CommentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Comment.
   * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
   * @example
   * // Update or create a Comment
   * const comment = await prisma.comment.upsert({
   *   create: {
   *     // ... data to create a Comment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Comment we want to update
   *   }
   * })
  **/
  upsert<T extends CommentUpsertArgs>(
    args: Subset<T, CommentUpsertArgs>
  ): CheckSelect<T, CommentClient<Comment>, CommentClient<CommentGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCommentArgs, 'select' | 'include'>): Promise<number>
}

export declare class CommentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, PostClient<Post | null>, PostClient<PostGetPayload<T> | null>>;

  comment_claps<T extends FindManyComment_ClapArgs = {}>(args?: Subset<T, FindManyComment_ClapArgs>): CheckSelect<T, Promise<Array<Comment_Clap>>, Promise<Array<Comment_ClapGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Comment findOne
 */
export type FindOneCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comment to fetch.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment findMany
 */
export type FindManyCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comments to fetch.
  **/
  where?: CommentWhereInput | null
  /**
   * Determine the order of the Comments to fetch.
  **/
  orderBy?: CommentOrderByInput | null
  /**
   * Skip the first `n` Comments.
  **/
  skip?: number | null
  /**
   * Get all Comments that come after the Comment you provide with the current order.
  **/
  after?: CommentWhereUniqueInput | null
  /**
   * Get all Comments that come before the Comment you provide with the current order.
  **/
  before?: CommentWhereUniqueInput | null
  /**
   * Get the first `n` Comments.
  **/
  first?: number | null
  /**
   * Get the last `n` Comments.
  **/
  last?: number | null
}


/**
 * Comment create
 */
export type CommentCreateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to create a Comment.
  **/
  data: CommentCreateInput
}


/**
 * Comment update
 */
export type CommentUpdateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to update a Comment.
  **/
  data: CommentUpdateInput
  /**
   * Choose, which Comment to update.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment updateMany
 */
export type CommentUpdateManyArgs = {
  data: CommentUpdateManyMutationInput
  where?: CommentWhereInput | null
}


/**
 * Comment upsert
 */
export type CommentUpsertArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The filter to search for the Comment to update in case it exists.
  **/
  where: CommentWhereUniqueInput
  /**
   * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
  **/
  create: CommentCreateInput
  /**
   * In case the Comment was found with the provided `where` argument, update it with this data.
  **/
  update: CommentUpdateInput
}


/**
 * Comment delete
 */
export type CommentDeleteArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter which Comment to delete.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment deleteMany
 */
export type CommentDeleteManyArgs = {
  where?: CommentWhereInput | null
}


/**
 * Comment without action
 */
export type CommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
}



/**
 * Model Comment_Clap
 */

export type Comment_Clap = {
  author_id: number
  comment_id: number
  id: number
}

export type Comment_ClapSelect = {
  author_id?: boolean
  comment_id?: boolean
  id?: boolean
  author?: boolean | UserArgs
  comment?: boolean | CommentArgs
}

export type Comment_ClapInclude = {
  author?: boolean | UserArgs
  comment?: boolean | CommentArgs
}

export type Comment_ClapGetPayload<
  S extends boolean | null | undefined | Comment_ClapArgs,
  U = keyof S
> = S extends true
  ? Comment_Clap
  : S extends undefined
  ? never
  : S extends FindManyComment_ClapArgs
  ? 'include' extends U
    ? Comment_Clap  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> :
      P extends 'comment'
      ? CommentGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Comment_Clap ? Comment_Clap[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> :
      P extends 'comment'
      ? CommentGetPayload<S['select'][P]> : never
    }
  : Comment_Clap
: Comment_Clap


export interface Comment_ClapDelegate {
  /**
   * Find zero or one Comment_Clap.
   * @param {FindOneComment_ClapArgs} args - Arguments to find a Comment_Clap
   * @example
   * // Get one Comment_Clap
   * const comment_Clap = await prisma.comment_Clap.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneComment_ClapArgs>(
    args: Subset<T, FindOneComment_ClapArgs>
  ): CheckSelect<T, Comment_ClapClient<Comment_Clap | null>, Comment_ClapClient<Comment_ClapGetPayload<T> | null>>
  /**
   * Find zero or more Comment_Claps.
   * @param {FindManyComment_ClapArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Comment_Claps
   * const comment_Claps = await prisma.comment_Clap.findMany()
   * 
   * // Get first 10 Comment_Claps
   * const comment_Claps = await prisma.comment_Clap.findMany({ first: 10 })
   * 
   * // Only select the `author_id`
   * const comment_ClapWithAuthor_idOnly = await prisma.comment_Clap.findMany({ select: { author_id: true } })
   * 
  **/
  findMany<T extends FindManyComment_ClapArgs>(
    args?: Subset<T, FindManyComment_ClapArgs>
  ): CheckSelect<T, Promise<Array<Comment_Clap>>, Promise<Array<Comment_ClapGetPayload<T>>>>
  /**
   * Create a Comment_Clap.
   * @param {Comment_ClapCreateArgs} args - Arguments to create a Comment_Clap.
   * @example
   * // Create one Comment_Clap
   * const user = await prisma.comment_Clap.create({
   *   data: {
   *     // ... data to create a Comment_Clap
   *   }
   * })
   * 
  **/
  create<T extends Comment_ClapCreateArgs>(
    args: Subset<T, Comment_ClapCreateArgs>
  ): CheckSelect<T, Comment_ClapClient<Comment_Clap>, Comment_ClapClient<Comment_ClapGetPayload<T>>>
  /**
   * Delete a Comment_Clap.
   * @param {Comment_ClapDeleteArgs} args - Arguments to delete one Comment_Clap.
   * @example
   * // Delete one Comment_Clap
   * const user = await prisma.comment_Clap.delete({
   *   where: {
   *     // ... filter to delete one Comment_Clap
   *   }
   * })
   * 
  **/
  delete<T extends Comment_ClapDeleteArgs>(
    args: Subset<T, Comment_ClapDeleteArgs>
  ): CheckSelect<T, Comment_ClapClient<Comment_Clap>, Comment_ClapClient<Comment_ClapGetPayload<T>>>
  /**
   * Update one Comment_Clap.
   * @param {Comment_ClapUpdateArgs} args - Arguments to update one Comment_Clap.
   * @example
   * // Update one Comment_Clap
   * const comment_Clap = await prisma.comment_Clap.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Comment_ClapUpdateArgs>(
    args: Subset<T, Comment_ClapUpdateArgs>
  ): CheckSelect<T, Comment_ClapClient<Comment_Clap>, Comment_ClapClient<Comment_ClapGetPayload<T>>>
  /**
   * Delete zero or more Comment_Claps.
   * @param {Comment_ClapDeleteManyArgs} args - Arguments to filter Comment_Claps to delete.
   * @example
   * // Delete a few Comment_Claps
   * const { count } = await prisma.comment_Clap.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Comment_ClapDeleteManyArgs>(
    args: Subset<T, Comment_ClapDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Comment_Claps.
   * @param {Comment_ClapUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Comment_Claps
   * const comment_Clap = await prisma.comment_Clap.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Comment_ClapUpdateManyArgs>(
    args: Subset<T, Comment_ClapUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Comment_Clap.
   * @param {Comment_ClapUpsertArgs} args - Arguments to update or create a Comment_Clap.
   * @example
   * // Update or create a Comment_Clap
   * const comment_Clap = await prisma.comment_Clap.upsert({
   *   create: {
   *     // ... data to create a Comment_Clap
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Comment_Clap we want to update
   *   }
   * })
  **/
  upsert<T extends Comment_ClapUpsertArgs>(
    args: Subset<T, Comment_ClapUpsertArgs>
  ): CheckSelect<T, Comment_ClapClient<Comment_Clap>, Comment_ClapClient<Comment_ClapGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyComment_ClapArgs, 'select' | 'include'>): Promise<number>
}

export declare class Comment_ClapClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  comment<T extends CommentArgs = {}>(args?: Subset<T, CommentArgs>): CheckSelect<T, CommentClient<Comment | null>, CommentClient<CommentGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Comment_Clap findOne
 */
export type FindOneComment_ClapArgs = {
  /**
   * Select specific fields to fetch from the Comment_Clap
  **/
  select?: Comment_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Comment_ClapInclude | null
  /**
   * Filter, which Comment_Clap to fetch.
  **/
  where: Comment_ClapWhereUniqueInput
}


/**
 * Comment_Clap findMany
 */
export type FindManyComment_ClapArgs = {
  /**
   * Select specific fields to fetch from the Comment_Clap
  **/
  select?: Comment_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Comment_ClapInclude | null
  /**
   * Filter, which Comment_Claps to fetch.
  **/
  where?: Comment_ClapWhereInput | null
  /**
   * Determine the order of the Comment_Claps to fetch.
  **/
  orderBy?: Comment_ClapOrderByInput | null
  /**
   * Skip the first `n` Comment_Claps.
  **/
  skip?: number | null
  /**
   * Get all Comment_Claps that come after the Comment_Clap you provide with the current order.
  **/
  after?: Comment_ClapWhereUniqueInput | null
  /**
   * Get all Comment_Claps that come before the Comment_Clap you provide with the current order.
  **/
  before?: Comment_ClapWhereUniqueInput | null
  /**
   * Get the first `n` Comment_Claps.
  **/
  first?: number | null
  /**
   * Get the last `n` Comment_Claps.
  **/
  last?: number | null
}


/**
 * Comment_Clap create
 */
export type Comment_ClapCreateArgs = {
  /**
   * Select specific fields to fetch from the Comment_Clap
  **/
  select?: Comment_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Comment_ClapInclude | null
  /**
   * The data needed to create a Comment_Clap.
  **/
  data: Comment_ClapCreateInput
}


/**
 * Comment_Clap update
 */
export type Comment_ClapUpdateArgs = {
  /**
   * Select specific fields to fetch from the Comment_Clap
  **/
  select?: Comment_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Comment_ClapInclude | null
  /**
   * The data needed to update a Comment_Clap.
  **/
  data: Comment_ClapUpdateInput
  /**
   * Choose, which Comment_Clap to update.
  **/
  where: Comment_ClapWhereUniqueInput
}


/**
 * Comment_Clap updateMany
 */
export type Comment_ClapUpdateManyArgs = {
  data: Comment_ClapUpdateManyMutationInput
  where?: Comment_ClapWhereInput | null
}


/**
 * Comment_Clap upsert
 */
export type Comment_ClapUpsertArgs = {
  /**
   * Select specific fields to fetch from the Comment_Clap
  **/
  select?: Comment_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Comment_ClapInclude | null
  /**
   * The filter to search for the Comment_Clap to update in case it exists.
  **/
  where: Comment_ClapWhereUniqueInput
  /**
   * In case the Comment_Clap found by the `where` argument doesn't exist, create a new Comment_Clap with this data.
  **/
  create: Comment_ClapCreateInput
  /**
   * In case the Comment_Clap was found with the provided `where` argument, update it with this data.
  **/
  update: Comment_ClapUpdateInput
}


/**
 * Comment_Clap delete
 */
export type Comment_ClapDeleteArgs = {
  /**
   * Select specific fields to fetch from the Comment_Clap
  **/
  select?: Comment_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Comment_ClapInclude | null
  /**
   * Filter which Comment_Clap to delete.
  **/
  where: Comment_ClapWhereUniqueInput
}


/**
 * Comment_Clap deleteMany
 */
export type Comment_ClapDeleteManyArgs = {
  where?: Comment_ClapWhereInput | null
}


/**
 * Comment_Clap without action
 */
export type Comment_ClapArgs = {
  /**
   * Select specific fields to fetch from the Comment_Clap
  **/
  select?: Comment_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Comment_ClapInclude | null
}



/**
 * Model Post
 */

export type Post = {
  created_at: Date | null
  attatchment_url: string | null
  author_id: number
  content: string
  id: number
}

export type PostSelect = {
  created_at?: boolean
  attatchment_url?: boolean
  author_id?: boolean
  content?: boolean
  id?: boolean
  author?: boolean | UserArgs
  comments?: boolean | FindManyCommentArgs
  claps?: boolean | FindManyPost_ClapArgs
  post_tags?: boolean | FindManyPost_TagArgs
}

export type PostInclude = {
  author?: boolean | UserArgs
  comments?: boolean | FindManyCommentArgs
  claps?: boolean | FindManyPost_ClapArgs
  post_tags?: boolean | FindManyPost_TagArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> :
      P extends 'comments'
      ? Array<CommentGetPayload<S['include'][P]>> :
      P extends 'claps'
      ? Array<Post_ClapGetPayload<S['include'][P]>> :
      P extends 'post_tags'
      ? Array<Post_TagGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> :
      P extends 'comments'
      ? Array<CommentGetPayload<S['select'][P]>> :
      P extends 'claps'
      ? Array<Post_ClapGetPayload<S['select'][P]>> :
      P extends 'post_tags'
      ? Array<Post_TagGetPayload<S['select'][P]>> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, PostClient<Post | null>, PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ first: 10 })
   * 
   * // Only select the `created_at`
   * const postWithCreated_atOnly = await prisma.post.findMany({ select: { created_at: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const user = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const user = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>
}

export declare class PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  comments<T extends FindManyCommentArgs = {}>(args?: Subset<T, FindManyCommentArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

  claps<T extends FindManyPost_ClapArgs = {}>(args?: Subset<T, FindManyPost_ClapArgs>): CheckSelect<T, Promise<Array<Post_Clap>>, Promise<Array<Post_ClapGetPayload<T>>>>;

  post_tags<T extends FindManyPost_TagArgs = {}>(args?: Subset<T, FindManyPost_TagArgs>): CheckSelect<T, Promise<Array<Post_Tag>>, Promise<Array<Post_TagGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput | null
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: PostOrderByInput | null
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number | null
  /**
   * Get all Posts that come after the Post you provide with the current order.
  **/
  after?: PostWhereUniqueInput | null
  /**
   * Get all Posts that come before the Post you provide with the current order.
  **/
  before?: PostWhereUniqueInput | null
  /**
   * Get the first `n` Posts.
  **/
  first?: number | null
  /**
   * Get the last `n` Posts.
  **/
  last?: number | null
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput | null
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput | null
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Model Post_Clap
 */

export type Post_Clap = {
  author_id: number
  id: number
  post_id: number
}

export type Post_ClapSelect = {
  author_id?: boolean
  id?: boolean
  post_id?: boolean
  author?: boolean | UserArgs
  post?: boolean | PostArgs
}

export type Post_ClapInclude = {
  author?: boolean | UserArgs
  post?: boolean | PostArgs
}

export type Post_ClapGetPayload<
  S extends boolean | null | undefined | Post_ClapArgs,
  U = keyof S
> = S extends true
  ? Post_Clap
  : S extends undefined
  ? never
  : S extends FindManyPost_ClapArgs
  ? 'include' extends U
    ? Post_Clap  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> :
      P extends 'post'
      ? PostGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post_Clap ? Post_Clap[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> :
      P extends 'post'
      ? PostGetPayload<S['select'][P]> : never
    }
  : Post_Clap
: Post_Clap


export interface Post_ClapDelegate {
  /**
   * Find zero or one Post_Clap.
   * @param {FindOnePost_ClapArgs} args - Arguments to find a Post_Clap
   * @example
   * // Get one Post_Clap
   * const post_Clap = await prisma.post_Clap.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePost_ClapArgs>(
    args: Subset<T, FindOnePost_ClapArgs>
  ): CheckSelect<T, Post_ClapClient<Post_Clap | null>, Post_ClapClient<Post_ClapGetPayload<T> | null>>
  /**
   * Find zero or more Post_Claps.
   * @param {FindManyPost_ClapArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Post_Claps
   * const post_Claps = await prisma.post_Clap.findMany()
   * 
   * // Get first 10 Post_Claps
   * const post_Claps = await prisma.post_Clap.findMany({ first: 10 })
   * 
   * // Only select the `author_id`
   * const post_ClapWithAuthor_idOnly = await prisma.post_Clap.findMany({ select: { author_id: true } })
   * 
  **/
  findMany<T extends FindManyPost_ClapArgs>(
    args?: Subset<T, FindManyPost_ClapArgs>
  ): CheckSelect<T, Promise<Array<Post_Clap>>, Promise<Array<Post_ClapGetPayload<T>>>>
  /**
   * Create a Post_Clap.
   * @param {Post_ClapCreateArgs} args - Arguments to create a Post_Clap.
   * @example
   * // Create one Post_Clap
   * const user = await prisma.post_Clap.create({
   *   data: {
   *     // ... data to create a Post_Clap
   *   }
   * })
   * 
  **/
  create<T extends Post_ClapCreateArgs>(
    args: Subset<T, Post_ClapCreateArgs>
  ): CheckSelect<T, Post_ClapClient<Post_Clap>, Post_ClapClient<Post_ClapGetPayload<T>>>
  /**
   * Delete a Post_Clap.
   * @param {Post_ClapDeleteArgs} args - Arguments to delete one Post_Clap.
   * @example
   * // Delete one Post_Clap
   * const user = await prisma.post_Clap.delete({
   *   where: {
   *     // ... filter to delete one Post_Clap
   *   }
   * })
   * 
  **/
  delete<T extends Post_ClapDeleteArgs>(
    args: Subset<T, Post_ClapDeleteArgs>
  ): CheckSelect<T, Post_ClapClient<Post_Clap>, Post_ClapClient<Post_ClapGetPayload<T>>>
  /**
   * Update one Post_Clap.
   * @param {Post_ClapUpdateArgs} args - Arguments to update one Post_Clap.
   * @example
   * // Update one Post_Clap
   * const post_Clap = await prisma.post_Clap.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Post_ClapUpdateArgs>(
    args: Subset<T, Post_ClapUpdateArgs>
  ): CheckSelect<T, Post_ClapClient<Post_Clap>, Post_ClapClient<Post_ClapGetPayload<T>>>
  /**
   * Delete zero or more Post_Claps.
   * @param {Post_ClapDeleteManyArgs} args - Arguments to filter Post_Claps to delete.
   * @example
   * // Delete a few Post_Claps
   * const { count } = await prisma.post_Clap.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Post_ClapDeleteManyArgs>(
    args: Subset<T, Post_ClapDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Post_Claps.
   * @param {Post_ClapUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Post_Claps
   * const post_Clap = await prisma.post_Clap.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Post_ClapUpdateManyArgs>(
    args: Subset<T, Post_ClapUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post_Clap.
   * @param {Post_ClapUpsertArgs} args - Arguments to update or create a Post_Clap.
   * @example
   * // Update or create a Post_Clap
   * const post_Clap = await prisma.post_Clap.upsert({
   *   create: {
   *     // ... data to create a Post_Clap
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post_Clap we want to update
   *   }
   * })
  **/
  upsert<T extends Post_ClapUpsertArgs>(
    args: Subset<T, Post_ClapUpsertArgs>
  ): CheckSelect<T, Post_ClapClient<Post_Clap>, Post_ClapClient<Post_ClapGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyPost_ClapArgs, 'select' | 'include'>): Promise<number>
}

export declare class Post_ClapClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, PostClient<Post | null>, PostClient<PostGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post_Clap findOne
 */
export type FindOnePost_ClapArgs = {
  /**
   * Select specific fields to fetch from the Post_Clap
  **/
  select?: Post_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_ClapInclude | null
  /**
   * Filter, which Post_Clap to fetch.
  **/
  where: Post_ClapWhereUniqueInput
}


/**
 * Post_Clap findMany
 */
export type FindManyPost_ClapArgs = {
  /**
   * Select specific fields to fetch from the Post_Clap
  **/
  select?: Post_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_ClapInclude | null
  /**
   * Filter, which Post_Claps to fetch.
  **/
  where?: Post_ClapWhereInput | null
  /**
   * Determine the order of the Post_Claps to fetch.
  **/
  orderBy?: Post_ClapOrderByInput | null
  /**
   * Skip the first `n` Post_Claps.
  **/
  skip?: number | null
  /**
   * Get all Post_Claps that come after the Post_Clap you provide with the current order.
  **/
  after?: Post_ClapWhereUniqueInput | null
  /**
   * Get all Post_Claps that come before the Post_Clap you provide with the current order.
  **/
  before?: Post_ClapWhereUniqueInput | null
  /**
   * Get the first `n` Post_Claps.
  **/
  first?: number | null
  /**
   * Get the last `n` Post_Claps.
  **/
  last?: number | null
}


/**
 * Post_Clap create
 */
export type Post_ClapCreateArgs = {
  /**
   * Select specific fields to fetch from the Post_Clap
  **/
  select?: Post_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_ClapInclude | null
  /**
   * The data needed to create a Post_Clap.
  **/
  data: Post_ClapCreateInput
}


/**
 * Post_Clap update
 */
export type Post_ClapUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post_Clap
  **/
  select?: Post_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_ClapInclude | null
  /**
   * The data needed to update a Post_Clap.
  **/
  data: Post_ClapUpdateInput
  /**
   * Choose, which Post_Clap to update.
  **/
  where: Post_ClapWhereUniqueInput
}


/**
 * Post_Clap updateMany
 */
export type Post_ClapUpdateManyArgs = {
  data: Post_ClapUpdateManyMutationInput
  where?: Post_ClapWhereInput | null
}


/**
 * Post_Clap upsert
 */
export type Post_ClapUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post_Clap
  **/
  select?: Post_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_ClapInclude | null
  /**
   * The filter to search for the Post_Clap to update in case it exists.
  **/
  where: Post_ClapWhereUniqueInput
  /**
   * In case the Post_Clap found by the `where` argument doesn't exist, create a new Post_Clap with this data.
  **/
  create: Post_ClapCreateInput
  /**
   * In case the Post_Clap was found with the provided `where` argument, update it with this data.
  **/
  update: Post_ClapUpdateInput
}


/**
 * Post_Clap delete
 */
export type Post_ClapDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post_Clap
  **/
  select?: Post_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_ClapInclude | null
  /**
   * Filter which Post_Clap to delete.
  **/
  where: Post_ClapWhereUniqueInput
}


/**
 * Post_Clap deleteMany
 */
export type Post_ClapDeleteManyArgs = {
  where?: Post_ClapWhereInput | null
}


/**
 * Post_Clap without action
 */
export type Post_ClapArgs = {
  /**
   * Select specific fields to fetch from the Post_Clap
  **/
  select?: Post_ClapSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_ClapInclude | null
}



/**
 * Model Post_Tag
 */

export type Post_Tag = {
  id: number
  post_id: number
  tag_id: number
}

export type Post_TagSelect = {
  id?: boolean
  post_id?: boolean
  tag_id?: boolean
  post?: boolean | PostArgs
  tag?: boolean | TagArgs
}

export type Post_TagInclude = {
  post?: boolean | PostArgs
  tag?: boolean | TagArgs
}

export type Post_TagGetPayload<
  S extends boolean | null | undefined | Post_TagArgs,
  U = keyof S
> = S extends true
  ? Post_Tag
  : S extends undefined
  ? never
  : S extends FindManyPost_TagArgs
  ? 'include' extends U
    ? Post_Tag  & {
      [P in TrueKeys<S['include']>]:
      P extends 'post'
      ? PostGetPayload<S['include'][P]> :
      P extends 'tag'
      ? TagGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post_Tag ? Post_Tag[P]
: 
      P extends 'post'
      ? PostGetPayload<S['select'][P]> :
      P extends 'tag'
      ? TagGetPayload<S['select'][P]> : never
    }
  : Post_Tag
: Post_Tag


export interface Post_TagDelegate {
  /**
   * Find zero or one Post_Tag.
   * @param {FindOnePost_TagArgs} args - Arguments to find a Post_Tag
   * @example
   * // Get one Post_Tag
   * const post_Tag = await prisma.post_Tag.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePost_TagArgs>(
    args: Subset<T, FindOnePost_TagArgs>
  ): CheckSelect<T, Post_TagClient<Post_Tag | null>, Post_TagClient<Post_TagGetPayload<T> | null>>
  /**
   * Find zero or more Post_Tags.
   * @param {FindManyPost_TagArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Post_Tags
   * const post_Tags = await prisma.post_Tag.findMany()
   * 
   * // Get first 10 Post_Tags
   * const post_Tags = await prisma.post_Tag.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const post_TagWithIdOnly = await prisma.post_Tag.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPost_TagArgs>(
    args?: Subset<T, FindManyPost_TagArgs>
  ): CheckSelect<T, Promise<Array<Post_Tag>>, Promise<Array<Post_TagGetPayload<T>>>>
  /**
   * Create a Post_Tag.
   * @param {Post_TagCreateArgs} args - Arguments to create a Post_Tag.
   * @example
   * // Create one Post_Tag
   * const user = await prisma.post_Tag.create({
   *   data: {
   *     // ... data to create a Post_Tag
   *   }
   * })
   * 
  **/
  create<T extends Post_TagCreateArgs>(
    args: Subset<T, Post_TagCreateArgs>
  ): CheckSelect<T, Post_TagClient<Post_Tag>, Post_TagClient<Post_TagGetPayload<T>>>
  /**
   * Delete a Post_Tag.
   * @param {Post_TagDeleteArgs} args - Arguments to delete one Post_Tag.
   * @example
   * // Delete one Post_Tag
   * const user = await prisma.post_Tag.delete({
   *   where: {
   *     // ... filter to delete one Post_Tag
   *   }
   * })
   * 
  **/
  delete<T extends Post_TagDeleteArgs>(
    args: Subset<T, Post_TagDeleteArgs>
  ): CheckSelect<T, Post_TagClient<Post_Tag>, Post_TagClient<Post_TagGetPayload<T>>>
  /**
   * Update one Post_Tag.
   * @param {Post_TagUpdateArgs} args - Arguments to update one Post_Tag.
   * @example
   * // Update one Post_Tag
   * const post_Tag = await prisma.post_Tag.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Post_TagUpdateArgs>(
    args: Subset<T, Post_TagUpdateArgs>
  ): CheckSelect<T, Post_TagClient<Post_Tag>, Post_TagClient<Post_TagGetPayload<T>>>
  /**
   * Delete zero or more Post_Tags.
   * @param {Post_TagDeleteManyArgs} args - Arguments to filter Post_Tags to delete.
   * @example
   * // Delete a few Post_Tags
   * const { count } = await prisma.post_Tag.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Post_TagDeleteManyArgs>(
    args: Subset<T, Post_TagDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Post_Tags.
   * @param {Post_TagUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Post_Tags
   * const post_Tag = await prisma.post_Tag.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Post_TagUpdateManyArgs>(
    args: Subset<T, Post_TagUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post_Tag.
   * @param {Post_TagUpsertArgs} args - Arguments to update or create a Post_Tag.
   * @example
   * // Update or create a Post_Tag
   * const post_Tag = await prisma.post_Tag.upsert({
   *   create: {
   *     // ... data to create a Post_Tag
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post_Tag we want to update
   *   }
   * })
  **/
  upsert<T extends Post_TagUpsertArgs>(
    args: Subset<T, Post_TagUpsertArgs>
  ): CheckSelect<T, Post_TagClient<Post_Tag>, Post_TagClient<Post_TagGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyPost_TagArgs, 'select' | 'include'>): Promise<number>
}

export declare class Post_TagClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, PostClient<Post | null>, PostClient<PostGetPayload<T> | null>>;

  tag<T extends TagArgs = {}>(args?: Subset<T, TagArgs>): CheckSelect<T, TagClient<Tag | null>, TagClient<TagGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post_Tag findOne
 */
export type FindOnePost_TagArgs = {
  /**
   * Select specific fields to fetch from the Post_Tag
  **/
  select?: Post_TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_TagInclude | null
  /**
   * Filter, which Post_Tag to fetch.
  **/
  where: Post_TagWhereUniqueInput
}


/**
 * Post_Tag findMany
 */
export type FindManyPost_TagArgs = {
  /**
   * Select specific fields to fetch from the Post_Tag
  **/
  select?: Post_TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_TagInclude | null
  /**
   * Filter, which Post_Tags to fetch.
  **/
  where?: Post_TagWhereInput | null
  /**
   * Determine the order of the Post_Tags to fetch.
  **/
  orderBy?: Post_TagOrderByInput | null
  /**
   * Skip the first `n` Post_Tags.
  **/
  skip?: number | null
  /**
   * Get all Post_Tags that come after the Post_Tag you provide with the current order.
  **/
  after?: Post_TagWhereUniqueInput | null
  /**
   * Get all Post_Tags that come before the Post_Tag you provide with the current order.
  **/
  before?: Post_TagWhereUniqueInput | null
  /**
   * Get the first `n` Post_Tags.
  **/
  first?: number | null
  /**
   * Get the last `n` Post_Tags.
  **/
  last?: number | null
}


/**
 * Post_Tag create
 */
export type Post_TagCreateArgs = {
  /**
   * Select specific fields to fetch from the Post_Tag
  **/
  select?: Post_TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_TagInclude | null
  /**
   * The data needed to create a Post_Tag.
  **/
  data: Post_TagCreateInput
}


/**
 * Post_Tag update
 */
export type Post_TagUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post_Tag
  **/
  select?: Post_TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_TagInclude | null
  /**
   * The data needed to update a Post_Tag.
  **/
  data: Post_TagUpdateInput
  /**
   * Choose, which Post_Tag to update.
  **/
  where: Post_TagWhereUniqueInput
}


/**
 * Post_Tag updateMany
 */
export type Post_TagUpdateManyArgs = {
  data: Post_TagUpdateManyMutationInput
  where?: Post_TagWhereInput | null
}


/**
 * Post_Tag upsert
 */
export type Post_TagUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post_Tag
  **/
  select?: Post_TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_TagInclude | null
  /**
   * The filter to search for the Post_Tag to update in case it exists.
  **/
  where: Post_TagWhereUniqueInput
  /**
   * In case the Post_Tag found by the `where` argument doesn't exist, create a new Post_Tag with this data.
  **/
  create: Post_TagCreateInput
  /**
   * In case the Post_Tag was found with the provided `where` argument, update it with this data.
  **/
  update: Post_TagUpdateInput
}


/**
 * Post_Tag delete
 */
export type Post_TagDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post_Tag
  **/
  select?: Post_TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_TagInclude | null
  /**
   * Filter which Post_Tag to delete.
  **/
  where: Post_TagWhereUniqueInput
}


/**
 * Post_Tag deleteMany
 */
export type Post_TagDeleteManyArgs = {
  where?: Post_TagWhereInput | null
}


/**
 * Post_Tag without action
 */
export type Post_TagArgs = {
  /**
   * Select specific fields to fetch from the Post_Tag
  **/
  select?: Post_TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: Post_TagInclude | null
}



/**
 * Model Tag
 */

export type Tag = {
  id: number
  tag: string | null
}

export type TagSelect = {
  id?: boolean
  tag?: boolean
  post_tags?: boolean | FindManyPost_TagArgs
}

export type TagInclude = {
  post_tags?: boolean | FindManyPost_TagArgs
}

export type TagGetPayload<
  S extends boolean | null | undefined | TagArgs,
  U = keyof S
> = S extends true
  ? Tag
  : S extends undefined
  ? never
  : S extends FindManyTagArgs
  ? 'include' extends U
    ? Tag  & {
      [P in TrueKeys<S['include']>]:
      P extends 'post_tags'
      ? Array<Post_TagGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Tag ? Tag[P]
: 
      P extends 'post_tags'
      ? Array<Post_TagGetPayload<S['select'][P]>> : never
    }
  : Tag
: Tag


export interface TagDelegate {
  /**
   * Find zero or one Tag.
   * @param {FindOneTagArgs} args - Arguments to find a Tag
   * @example
   * // Get one Tag
   * const tag = await prisma.tag.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTagArgs>(
    args: Subset<T, FindOneTagArgs>
  ): CheckSelect<T, TagClient<Tag | null>, TagClient<TagGetPayload<T> | null>>
  /**
   * Find zero or more Tags.
   * @param {FindManyTagArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Tags
   * const tags = await prisma.tag.findMany()
   * 
   * // Get first 10 Tags
   * const tags = await prisma.tag.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTagArgs>(
    args?: Subset<T, FindManyTagArgs>
  ): CheckSelect<T, Promise<Array<Tag>>, Promise<Array<TagGetPayload<T>>>>
  /**
   * Create a Tag.
   * @param {TagCreateArgs} args - Arguments to create a Tag.
   * @example
   * // Create one Tag
   * const user = await prisma.tag.create({
   *   data: {
   *     // ... data to create a Tag
   *   }
   * })
   * 
  **/
  create<T extends TagCreateArgs>(
    args: Subset<T, TagCreateArgs>
  ): CheckSelect<T, TagClient<Tag>, TagClient<TagGetPayload<T>>>
  /**
   * Delete a Tag.
   * @param {TagDeleteArgs} args - Arguments to delete one Tag.
   * @example
   * // Delete one Tag
   * const user = await prisma.tag.delete({
   *   where: {
   *     // ... filter to delete one Tag
   *   }
   * })
   * 
  **/
  delete<T extends TagDeleteArgs>(
    args: Subset<T, TagDeleteArgs>
  ): CheckSelect<T, TagClient<Tag>, TagClient<TagGetPayload<T>>>
  /**
   * Update one Tag.
   * @param {TagUpdateArgs} args - Arguments to update one Tag.
   * @example
   * // Update one Tag
   * const tag = await prisma.tag.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TagUpdateArgs>(
    args: Subset<T, TagUpdateArgs>
  ): CheckSelect<T, TagClient<Tag>, TagClient<TagGetPayload<T>>>
  /**
   * Delete zero or more Tags.
   * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
   * @example
   * // Delete a few Tags
   * const { count } = await prisma.tag.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TagDeleteManyArgs>(
    args: Subset<T, TagDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Tags.
   * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Tags
   * const tag = await prisma.tag.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TagUpdateManyArgs>(
    args: Subset<T, TagUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Tag.
   * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
   * @example
   * // Update or create a Tag
   * const tag = await prisma.tag.upsert({
   *   create: {
   *     // ... data to create a Tag
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Tag we want to update
   *   }
   * })
  **/
  upsert<T extends TagUpsertArgs>(
    args: Subset<T, TagUpsertArgs>
  ): CheckSelect<T, TagClient<Tag>, TagClient<TagGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyTagArgs, 'select' | 'include'>): Promise<number>
}

export declare class TagClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  post_tags<T extends FindManyPost_TagArgs = {}>(args?: Subset<T, FindManyPost_TagArgs>): CheckSelect<T, Promise<Array<Post_Tag>>, Promise<Array<Post_TagGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Tag findOne
 */
export type FindOneTagArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TagInclude | null
  /**
   * Filter, which Tag to fetch.
  **/
  where: TagWhereUniqueInput
}


/**
 * Tag findMany
 */
export type FindManyTagArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TagInclude | null
  /**
   * Filter, which Tags to fetch.
  **/
  where?: TagWhereInput | null
  /**
   * Determine the order of the Tags to fetch.
  **/
  orderBy?: TagOrderByInput | null
  /**
   * Skip the first `n` Tags.
  **/
  skip?: number | null
  /**
   * Get all Tags that come after the Tag you provide with the current order.
  **/
  after?: TagWhereUniqueInput | null
  /**
   * Get all Tags that come before the Tag you provide with the current order.
  **/
  before?: TagWhereUniqueInput | null
  /**
   * Get the first `n` Tags.
  **/
  first?: number | null
  /**
   * Get the last `n` Tags.
  **/
  last?: number | null
}


/**
 * Tag create
 */
export type TagCreateArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TagInclude | null
  /**
   * The data needed to create a Tag.
  **/
  data: TagCreateInput
}


/**
 * Tag update
 */
export type TagUpdateArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TagInclude | null
  /**
   * The data needed to update a Tag.
  **/
  data: TagUpdateInput
  /**
   * Choose, which Tag to update.
  **/
  where: TagWhereUniqueInput
}


/**
 * Tag updateMany
 */
export type TagUpdateManyArgs = {
  data: TagUpdateManyMutationInput
  where?: TagWhereInput | null
}


/**
 * Tag upsert
 */
export type TagUpsertArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TagInclude | null
  /**
   * The filter to search for the Tag to update in case it exists.
  **/
  where: TagWhereUniqueInput
  /**
   * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
  **/
  create: TagCreateInput
  /**
   * In case the Tag was found with the provided `where` argument, update it with this data.
  **/
  update: TagUpdateInput
}


/**
 * Tag delete
 */
export type TagDeleteArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TagInclude | null
  /**
   * Filter which Tag to delete.
  **/
  where: TagWhereUniqueInput
}


/**
 * Tag deleteMany
 */
export type TagDeleteManyArgs = {
  where?: TagWhereInput | null
}


/**
 * Tag without action
 */
export type TagArgs = {
  /**
   * Select specific fields to fetch from the Tag
  **/
  select?: TagSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TagInclude | null
}



/**
 * Model Follow
 */

export type Follow = {
  created_at: Date | null
  followed_user_id: number
  following_user_id: number
  id: number
}

export type FollowSelect = {
  created_at?: boolean
  followed_user_id?: boolean
  following_user_id?: boolean
  id?: boolean
  followed?: boolean | UserArgs
  following?: boolean | UserArgs
}

export type FollowInclude = {
  followed?: boolean | UserArgs
  following?: boolean | UserArgs
}

export type FollowGetPayload<
  S extends boolean | null | undefined | FollowArgs,
  U = keyof S
> = S extends true
  ? Follow
  : S extends undefined
  ? never
  : S extends FindManyFollowArgs
  ? 'include' extends U
    ? Follow  & {
      [P in TrueKeys<S['include']>]:
      P extends 'followed'
      ? UserGetPayload<S['include'][P]> :
      P extends 'following'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Follow ? Follow[P]
: 
      P extends 'followed'
      ? UserGetPayload<S['select'][P]> :
      P extends 'following'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Follow
: Follow


export interface FollowDelegate {
  /**
   * Find zero or one Follow.
   * @param {FindOneFollowArgs} args - Arguments to find a Follow
   * @example
   * // Get one Follow
   * const follow = await prisma.follow.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneFollowArgs>(
    args: Subset<T, FindOneFollowArgs>
  ): CheckSelect<T, FollowClient<Follow | null>, FollowClient<FollowGetPayload<T> | null>>
  /**
   * Find zero or more Follows.
   * @param {FindManyFollowArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Follows
   * const follows = await prisma.follow.findMany()
   * 
   * // Get first 10 Follows
   * const follows = await prisma.follow.findMany({ first: 10 })
   * 
   * // Only select the `created_at`
   * const followWithCreated_atOnly = await prisma.follow.findMany({ select: { created_at: true } })
   * 
  **/
  findMany<T extends FindManyFollowArgs>(
    args?: Subset<T, FindManyFollowArgs>
  ): CheckSelect<T, Promise<Array<Follow>>, Promise<Array<FollowGetPayload<T>>>>
  /**
   * Create a Follow.
   * @param {FollowCreateArgs} args - Arguments to create a Follow.
   * @example
   * // Create one Follow
   * const user = await prisma.follow.create({
   *   data: {
   *     // ... data to create a Follow
   *   }
   * })
   * 
  **/
  create<T extends FollowCreateArgs>(
    args: Subset<T, FollowCreateArgs>
  ): CheckSelect<T, FollowClient<Follow>, FollowClient<FollowGetPayload<T>>>
  /**
   * Delete a Follow.
   * @param {FollowDeleteArgs} args - Arguments to delete one Follow.
   * @example
   * // Delete one Follow
   * const user = await prisma.follow.delete({
   *   where: {
   *     // ... filter to delete one Follow
   *   }
   * })
   * 
  **/
  delete<T extends FollowDeleteArgs>(
    args: Subset<T, FollowDeleteArgs>
  ): CheckSelect<T, FollowClient<Follow>, FollowClient<FollowGetPayload<T>>>
  /**
   * Update one Follow.
   * @param {FollowUpdateArgs} args - Arguments to update one Follow.
   * @example
   * // Update one Follow
   * const follow = await prisma.follow.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends FollowUpdateArgs>(
    args: Subset<T, FollowUpdateArgs>
  ): CheckSelect<T, FollowClient<Follow>, FollowClient<FollowGetPayload<T>>>
  /**
   * Delete zero or more Follows.
   * @param {FollowDeleteManyArgs} args - Arguments to filter Follows to delete.
   * @example
   * // Delete a few Follows
   * const { count } = await prisma.follow.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends FollowDeleteManyArgs>(
    args: Subset<T, FollowDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Follows.
   * @param {FollowUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Follows
   * const follow = await prisma.follow.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends FollowUpdateManyArgs>(
    args: Subset<T, FollowUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Follow.
   * @param {FollowUpsertArgs} args - Arguments to update or create a Follow.
   * @example
   * // Update or create a Follow
   * const follow = await prisma.follow.upsert({
   *   create: {
   *     // ... data to create a Follow
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Follow we want to update
   *   }
   * })
  **/
  upsert<T extends FollowUpsertArgs>(
    args: Subset<T, FollowUpsertArgs>
  ): CheckSelect<T, FollowClient<Follow>, FollowClient<FollowGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyFollowArgs, 'select' | 'include'>): Promise<number>
}

export declare class FollowClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  followed<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  following<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Follow findOne
 */
export type FindOneFollowArgs = {
  /**
   * Select specific fields to fetch from the Follow
  **/
  select?: FollowSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FollowInclude | null
  /**
   * Filter, which Follow to fetch.
  **/
  where: FollowWhereUniqueInput
}


/**
 * Follow findMany
 */
export type FindManyFollowArgs = {
  /**
   * Select specific fields to fetch from the Follow
  **/
  select?: FollowSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FollowInclude | null
  /**
   * Filter, which Follows to fetch.
  **/
  where?: FollowWhereInput | null
  /**
   * Determine the order of the Follows to fetch.
  **/
  orderBy?: FollowOrderByInput | null
  /**
   * Skip the first `n` Follows.
  **/
  skip?: number | null
  /**
   * Get all Follows that come after the Follow you provide with the current order.
  **/
  after?: FollowWhereUniqueInput | null
  /**
   * Get all Follows that come before the Follow you provide with the current order.
  **/
  before?: FollowWhereUniqueInput | null
  /**
   * Get the first `n` Follows.
  **/
  first?: number | null
  /**
   * Get the last `n` Follows.
  **/
  last?: number | null
}


/**
 * Follow create
 */
export type FollowCreateArgs = {
  /**
   * Select specific fields to fetch from the Follow
  **/
  select?: FollowSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FollowInclude | null
  /**
   * The data needed to create a Follow.
  **/
  data: FollowCreateInput
}


/**
 * Follow update
 */
export type FollowUpdateArgs = {
  /**
   * Select specific fields to fetch from the Follow
  **/
  select?: FollowSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FollowInclude | null
  /**
   * The data needed to update a Follow.
  **/
  data: FollowUpdateInput
  /**
   * Choose, which Follow to update.
  **/
  where: FollowWhereUniqueInput
}


/**
 * Follow updateMany
 */
export type FollowUpdateManyArgs = {
  data: FollowUpdateManyMutationInput
  where?: FollowWhereInput | null
}


/**
 * Follow upsert
 */
export type FollowUpsertArgs = {
  /**
   * Select specific fields to fetch from the Follow
  **/
  select?: FollowSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FollowInclude | null
  /**
   * The filter to search for the Follow to update in case it exists.
  **/
  where: FollowWhereUniqueInput
  /**
   * In case the Follow found by the `where` argument doesn't exist, create a new Follow with this data.
  **/
  create: FollowCreateInput
  /**
   * In case the Follow was found with the provided `where` argument, update it with this data.
  **/
  update: FollowUpdateInput
}


/**
 * Follow delete
 */
export type FollowDeleteArgs = {
  /**
   * Select specific fields to fetch from the Follow
  **/
  select?: FollowSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FollowInclude | null
  /**
   * Filter which Follow to delete.
  **/
  where: FollowWhereUniqueInput
}


/**
 * Follow deleteMany
 */
export type FollowDeleteManyArgs = {
  where?: FollowWhereInput | null
}


/**
 * Follow without action
 */
export type FollowArgs = {
  /**
   * Select specific fields to fetch from the Follow
  **/
  select?: FollowSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: FollowInclude | null
}



/**
 * Model User
 */

export type User = {
  created_at: Date | null
  email: string
  first: string
  id: number
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type: role_enum | null
}

export type UserSelect = {
  created_at?: boolean
  email?: boolean
  first?: boolean
  id?: boolean
  last?: boolean
  location?: boolean
  password?: boolean
  phone?: boolean
  profile_pic_url?: boolean
  username?: boolean
  role_type?: boolean
  comments?: boolean | FindManyCommentArgs
  comment_claps?: boolean | FindManyComment_ClapArgs
  followers?: boolean | FindManyFollowArgs
  following?: boolean | FindManyFollowArgs
  posts?: boolean | FindManyPostArgs
  post_claps?: boolean | FindManyPost_ClapArgs
}

export type UserInclude = {
  comments?: boolean | FindManyCommentArgs
  comment_claps?: boolean | FindManyComment_ClapArgs
  followers?: boolean | FindManyFollowArgs
  following?: boolean | FindManyFollowArgs
  posts?: boolean | FindManyPostArgs
  post_claps?: boolean | FindManyPost_ClapArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'comments'
      ? Array<CommentGetPayload<S['include'][P]>> :
      P extends 'comment_claps'
      ? Array<Comment_ClapGetPayload<S['include'][P]>> :
      P extends 'followers'
      ? Array<FollowGetPayload<S['include'][P]>> :
      P extends 'following'
      ? Array<FollowGetPayload<S['include'][P]>> :
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> :
      P extends 'post_claps'
      ? Array<Post_ClapGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'comments'
      ? Array<CommentGetPayload<S['select'][P]>> :
      P extends 'comment_claps'
      ? Array<Comment_ClapGetPayload<S['select'][P]>> :
      P extends 'followers'
      ? Array<FollowGetPayload<S['select'][P]>> :
      P extends 'following'
      ? Array<FollowGetPayload<S['select'][P]>> :
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> :
      P extends 'post_claps'
      ? Array<Post_ClapGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ first: 10 })
   * 
   * // Only select the `created_at`
   * const userWithCreated_atOnly = await prisma.user.findMany({ select: { created_at: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const user = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const user = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>
}

export declare class UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  comments<T extends FindManyCommentArgs = {}>(args?: Subset<T, FindManyCommentArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

  comment_claps<T extends FindManyComment_ClapArgs = {}>(args?: Subset<T, FindManyComment_ClapArgs>): CheckSelect<T, Promise<Array<Comment_Clap>>, Promise<Array<Comment_ClapGetPayload<T>>>>;

  followers<T extends FindManyFollowArgs = {}>(args?: Subset<T, FindManyFollowArgs>): CheckSelect<T, Promise<Array<Follow>>, Promise<Array<FollowGetPayload<T>>>>;

  following<T extends FindManyFollowArgs = {}>(args?: Subset<T, FindManyFollowArgs>): CheckSelect<T, Promise<Array<Follow>>, Promise<Array<FollowGetPayload<T>>>>;

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  post_claps<T extends FindManyPost_ClapArgs = {}>(args?: Subset<T, FindManyPost_ClapArgs>): CheckSelect<T, Promise<Array<Post_Clap>>, Promise<Array<Post_ClapGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput | null
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: UserOrderByInput | null
  /**
   * Skip the first `n` Users.
  **/
  skip?: number | null
  /**
   * Get all Users that come after the User you provide with the current order.
  **/
  after?: UserWhereUniqueInput | null
  /**
   * Get all Users that come before the User you provide with the current order.
  **/
  before?: UserWhereUniqueInput | null
  /**
   * Get the first `n` Users.
  **/
  first?: number | null
  /**
   * Get the last `n` Users.
  **/
  last?: number | null
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput | null
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput | null
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Deep Input Types
 */


export type Comment_ClapWhereInput = {
  author_id?: number | IntFilter | null
  comment_id?: number | IntFilter | null
  id?: number | IntFilter | null
  AND?: Enumerable<Comment_ClapWhereInput> | null
  OR?: Enumerable<Comment_ClapWhereInput> | null
  NOT?: Enumerable<Comment_ClapWhereInput> | null
  author?: UserWhereInput | null
  comment?: CommentWhereInput | null
}

export type FollowWhereInput = {
  created_at?: Date | string | NullableDateTimeFilter | null
  followed_user_id?: number | IntFilter | null
  following_user_id?: number | IntFilter | null
  id?: number | IntFilter | null
  AND?: Enumerable<FollowWhereInput> | null
  OR?: Enumerable<FollowWhereInput> | null
  NOT?: Enumerable<FollowWhereInput> | null
  followed?: UserWhereInput | null
  following?: UserWhereInput | null
}

export type Post_ClapWhereInput = {
  author_id?: number | IntFilter | null
  id?: number | IntFilter | null
  post_id?: number | IntFilter | null
  AND?: Enumerable<Post_ClapWhereInput> | null
  OR?: Enumerable<Post_ClapWhereInput> | null
  NOT?: Enumerable<Post_ClapWhereInput> | null
  author?: UserWhereInput | null
  post?: PostWhereInput | null
}

export type TagWhereInput = {
  id?: number | IntFilter | null
  tag?: string | NullableStringFilter | null
  post_tags?: Post_TagFilter | null
  AND?: Enumerable<TagWhereInput> | null
  OR?: Enumerable<TagWhereInput> | null
  NOT?: Enumerable<TagWhereInput> | null
}

export type Post_TagWhereInput = {
  id?: number | IntFilter | null
  post_id?: number | IntFilter | null
  tag_id?: number | IntFilter | null
  AND?: Enumerable<Post_TagWhereInput> | null
  OR?: Enumerable<Post_TagWhereInput> | null
  NOT?: Enumerable<Post_TagWhereInput> | null
  post?: PostWhereInput | null
  tag?: TagWhereInput | null
}

export type PostWhereInput = {
  created_at?: Date | string | NullableDateTimeFilter | null
  attatchment_url?: string | NullableStringFilter | null
  author_id?: number | IntFilter | null
  content?: string | StringFilter | null
  id?: number | IntFilter | null
  comments?: CommentFilter | null
  claps?: Post_ClapFilter | null
  post_tags?: Post_TagFilter | null
  AND?: Enumerable<PostWhereInput> | null
  OR?: Enumerable<PostWhereInput> | null
  NOT?: Enumerable<PostWhereInput> | null
  author?: UserWhereInput | null
}

export type UserWhereInput = {
  created_at?: Date | string | NullableDateTimeFilter | null
  email?: string | StringFilter | null
  first?: string | StringFilter | null
  id?: number | IntFilter | null
  last?: string | StringFilter | null
  location?: string | StringFilter | null
  password?: string | StringFilter | null
  phone?: string | StringFilter | null
  profile_pic_url?: string | StringFilter | null
  username?: string | StringFilter | null
  role_type?: role_enum | Nullablerole_enumFilter | null
  comments?: CommentFilter | null
  comment_claps?: Comment_ClapFilter | null
  followers?: FollowFilter | null
  following?: FollowFilter | null
  posts?: PostFilter | null
  post_claps?: Post_ClapFilter | null
  AND?: Enumerable<UserWhereInput> | null
  OR?: Enumerable<UserWhereInput> | null
  NOT?: Enumerable<UserWhereInput> | null
}

export type CommentWhereInput = {
  created_at?: Date | string | NullableDateTimeFilter | null
  author_id?: number | IntFilter | null
  content?: string | NullableStringFilter | null
  id?: number | IntFilter | null
  post_id?: number | IntFilter | null
  comment_claps?: Comment_ClapFilter | null
  AND?: Enumerable<CommentWhereInput> | null
  OR?: Enumerable<CommentWhereInput> | null
  NOT?: Enumerable<CommentWhereInput> | null
  author?: UserWhereInput | null
  post?: PostWhereInput | null
}

export type CommentWhereUniqueInput = {
  id?: number | null
}

export type Comment_ClapWhereUniqueInput = {
  id?: number | null
}

export type FollowWhereUniqueInput = {
  id?: number | null
}

export type PostWhereUniqueInput = {
  attatchment_url?: string | null
  id?: number | null
}

export type Post_ClapWhereUniqueInput = {
  id?: number | null
}

export type Post_TagWhereUniqueInput = {
  id?: number | null
}

export type TagWhereUniqueInput = {
  id?: number | null
}

export type UserWhereUniqueInput = {
  id?: number | null
  username?: string | null
}

export type CommentCreateWithoutPostInput = {
  created_at?: Date | string | null
  content?: string | null
  author: UserCreateOneWithoutCommentsInput
  comment_claps?: Comment_ClapCreateManyWithoutCommentInput | null
}

export type CommentCreateManyWithoutPostInput = {
  create?: Enumerable<CommentCreateWithoutPostInput> | null
  connect?: Enumerable<CommentWhereUniqueInput> | null
}

export type TagCreateWithoutPost_tagsInput = {
  tag?: string | null
}

export type TagCreateOneWithoutPost_tagsInput = {
  create?: TagCreateWithoutPost_tagsInput | null
  connect?: TagWhereUniqueInput | null
}

export type Post_TagCreateWithoutPostInput = {
  tag: TagCreateOneWithoutPost_tagsInput
}

export type Post_TagCreateManyWithoutPostInput = {
  create?: Enumerable<Post_TagCreateWithoutPostInput> | null
  connect?: Enumerable<Post_TagWhereUniqueInput> | null
}

export type PostCreateWithoutClapsInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content: string
  author: UserCreateOneWithoutPostsInput
  comments?: CommentCreateManyWithoutPostInput | null
  post_tags?: Post_TagCreateManyWithoutPostInput | null
}

export type PostCreateOneWithoutClapsInput = {
  create?: PostCreateWithoutClapsInput | null
  connect?: PostWhereUniqueInput | null
}

export type Post_ClapCreateWithoutAuthorInput = {
  post: PostCreateOneWithoutClapsInput
}

export type Post_ClapCreateManyWithoutAuthorInput = {
  create?: Enumerable<Post_ClapCreateWithoutAuthorInput> | null
  connect?: Enumerable<Post_ClapWhereUniqueInput> | null
}

export type UserCreateWithoutFollowersInput = {
  created_at?: Date | string | null
  email: string
  first: string
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type?: role_enum | null
  comments?: CommentCreateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapCreateManyWithoutAuthorInput | null
  following?: FollowCreateManyWithoutFollowingInput | null
  posts?: PostCreateManyWithoutAuthorInput | null
  post_claps?: Post_ClapCreateManyWithoutAuthorInput | null
}

export type UserCreateOneWithoutFollowersInput = {
  create?: UserCreateWithoutFollowersInput | null
  connect?: UserWhereUniqueInput | null
}

export type FollowCreateWithoutFollowingInput = {
  created_at?: Date | string | null
  followed: UserCreateOneWithoutFollowersInput
}

export type FollowCreateManyWithoutFollowingInput = {
  create?: Enumerable<FollowCreateWithoutFollowingInput> | null
  connect?: Enumerable<FollowWhereUniqueInput> | null
}

export type UserCreateWithoutPost_clapsInput = {
  created_at?: Date | string | null
  email: string
  first: string
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type?: role_enum | null
  comments?: CommentCreateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapCreateManyWithoutAuthorInput | null
  followers?: FollowCreateManyWithoutFollowedInput | null
  following?: FollowCreateManyWithoutFollowingInput | null
  posts?: PostCreateManyWithoutAuthorInput | null
}

export type UserCreateOneWithoutPost_clapsInput = {
  create?: UserCreateWithoutPost_clapsInput | null
  connect?: UserWhereUniqueInput | null
}

export type Post_ClapCreateWithoutPostInput = {
  author: UserCreateOneWithoutPost_clapsInput
}

export type Post_ClapCreateManyWithoutPostInput = {
  create?: Enumerable<Post_ClapCreateWithoutPostInput> | null
  connect?: Enumerable<Post_ClapWhereUniqueInput> | null
}

export type PostCreateWithoutAuthorInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content: string
  comments?: CommentCreateManyWithoutPostInput | null
  claps?: Post_ClapCreateManyWithoutPostInput | null
  post_tags?: Post_TagCreateManyWithoutPostInput | null
}

export type PostCreateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput> | null
  connect?: Enumerable<PostWhereUniqueInput> | null
}

export type UserCreateWithoutFollowingInput = {
  created_at?: Date | string | null
  email: string
  first: string
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type?: role_enum | null
  comments?: CommentCreateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapCreateManyWithoutAuthorInput | null
  followers?: FollowCreateManyWithoutFollowedInput | null
  posts?: PostCreateManyWithoutAuthorInput | null
  post_claps?: Post_ClapCreateManyWithoutAuthorInput | null
}

export type UserCreateOneWithoutFollowingInput = {
  create?: UserCreateWithoutFollowingInput | null
  connect?: UserWhereUniqueInput | null
}

export type FollowCreateWithoutFollowedInput = {
  created_at?: Date | string | null
  following: UserCreateOneWithoutFollowingInput
}

export type FollowCreateManyWithoutFollowedInput = {
  create?: Enumerable<FollowCreateWithoutFollowedInput> | null
  connect?: Enumerable<FollowWhereUniqueInput> | null
}

export type UserCreateWithoutComment_clapsInput = {
  created_at?: Date | string | null
  email: string
  first: string
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type?: role_enum | null
  comments?: CommentCreateManyWithoutAuthorInput | null
  followers?: FollowCreateManyWithoutFollowedInput | null
  following?: FollowCreateManyWithoutFollowingInput | null
  posts?: PostCreateManyWithoutAuthorInput | null
  post_claps?: Post_ClapCreateManyWithoutAuthorInput | null
}

export type UserCreateOneWithoutComment_clapsInput = {
  create?: UserCreateWithoutComment_clapsInput | null
  connect?: UserWhereUniqueInput | null
}

export type Comment_ClapCreateWithoutCommentInput = {
  author: UserCreateOneWithoutComment_clapsInput
}

export type Comment_ClapCreateManyWithoutCommentInput = {
  create?: Enumerable<Comment_ClapCreateWithoutCommentInput> | null
  connect?: Enumerable<Comment_ClapWhereUniqueInput> | null
}

export type CommentCreateWithoutAuthorInput = {
  created_at?: Date | string | null
  content?: string | null
  post: PostCreateOneWithoutCommentsInput
  comment_claps?: Comment_ClapCreateManyWithoutCommentInput | null
}

export type CommentCreateManyWithoutAuthorInput = {
  create?: Enumerable<CommentCreateWithoutAuthorInput> | null
  connect?: Enumerable<CommentWhereUniqueInput> | null
}

export type UserCreateWithoutPostsInput = {
  created_at?: Date | string | null
  email: string
  first: string
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type?: role_enum | null
  comments?: CommentCreateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapCreateManyWithoutAuthorInput | null
  followers?: FollowCreateManyWithoutFollowedInput | null
  following?: FollowCreateManyWithoutFollowingInput | null
  post_claps?: Post_ClapCreateManyWithoutAuthorInput | null
}

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput | null
  connect?: UserWhereUniqueInput | null
}

export type PostCreateWithoutCommentsInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content: string
  author: UserCreateOneWithoutPostsInput
  claps?: Post_ClapCreateManyWithoutPostInput | null
  post_tags?: Post_TagCreateManyWithoutPostInput | null
}

export type PostCreateOneWithoutCommentsInput = {
  create?: PostCreateWithoutCommentsInput | null
  connect?: PostWhereUniqueInput | null
}

export type CommentCreateWithoutComment_clapsInput = {
  created_at?: Date | string | null
  content?: string | null
  author: UserCreateOneWithoutCommentsInput
  post: PostCreateOneWithoutCommentsInput
}

export type CommentCreateOneWithoutComment_clapsInput = {
  create?: CommentCreateWithoutComment_clapsInput | null
  connect?: CommentWhereUniqueInput | null
}

export type Comment_ClapCreateWithoutAuthorInput = {
  comment: CommentCreateOneWithoutComment_clapsInput
}

export type Comment_ClapCreateManyWithoutAuthorInput = {
  create?: Enumerable<Comment_ClapCreateWithoutAuthorInput> | null
  connect?: Enumerable<Comment_ClapWhereUniqueInput> | null
}

export type UserCreateWithoutCommentsInput = {
  created_at?: Date | string | null
  email: string
  first: string
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type?: role_enum | null
  comment_claps?: Comment_ClapCreateManyWithoutAuthorInput | null
  followers?: FollowCreateManyWithoutFollowedInput | null
  following?: FollowCreateManyWithoutFollowingInput | null
  posts?: PostCreateManyWithoutAuthorInput | null
  post_claps?: Post_ClapCreateManyWithoutAuthorInput | null
}

export type UserCreateOneWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput | null
  connect?: UserWhereUniqueInput | null
}

export type CommentCreateInput = {
  created_at?: Date | string | null
  content?: string | null
  author: UserCreateOneWithoutCommentsInput
  post: PostCreateOneWithoutCommentsInput
  comment_claps?: Comment_ClapCreateManyWithoutCommentInput | null
}

export type CommentUpdateWithoutPostDataInput = {
  created_at?: Date | string | null
  content?: string | null
  id?: number | null
  author?: UserUpdateOneRequiredWithoutCommentsInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutCommentInput | null
}

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutPostDataInput
}

export type CommentScalarWhereInput = {
  created_at?: Date | string | NullableDateTimeFilter | null
  author_id?: number | IntFilter | null
  content?: string | NullableStringFilter | null
  id?: number | IntFilter | null
  post_id?: number | IntFilter | null
  comment_claps?: Comment_ClapFilter | null
  AND?: Enumerable<CommentScalarWhereInput> | null
  OR?: Enumerable<CommentScalarWhereInput> | null
  NOT?: Enumerable<CommentScalarWhereInput> | null
}

export type CommentUpdateManyDataInput = {
  created_at?: Date | string | null
  content?: string | null
  id?: number | null
}

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput
  data: CommentUpdateManyDataInput
}

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutPostDataInput
  create: CommentCreateWithoutPostInput
}

export type CommentUpdateManyWithoutPostInput = {
  create?: Enumerable<CommentCreateWithoutPostInput> | null
  connect?: Enumerable<CommentWhereUniqueInput> | null
  set?: Enumerable<CommentWhereUniqueInput> | null
  disconnect?: Enumerable<CommentWhereUniqueInput> | null
  delete?: Enumerable<CommentWhereUniqueInput> | null
  update?: Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput> | null
  updateMany?: Enumerable<CommentUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<CommentScalarWhereInput> | null
  upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput> | null
}

export type TagUpdateWithoutPost_tagsDataInput = {
  id?: number | null
  tag?: string | null
}

export type TagUpsertWithoutPost_tagsInput = {
  update: TagUpdateWithoutPost_tagsDataInput
  create: TagCreateWithoutPost_tagsInput
}

export type TagUpdateOneRequiredWithoutPost_tagsInput = {
  create?: TagCreateWithoutPost_tagsInput | null
  connect?: TagWhereUniqueInput | null
  update?: TagUpdateWithoutPost_tagsDataInput | null
  upsert?: TagUpsertWithoutPost_tagsInput | null
}

export type Post_TagUpdateWithoutPostDataInput = {
  id?: number | null
  tag?: TagUpdateOneRequiredWithoutPost_tagsInput | null
}

export type Post_TagUpdateWithWhereUniqueWithoutPostInput = {
  where: Post_TagWhereUniqueInput
  data: Post_TagUpdateWithoutPostDataInput
}

export type Post_TagScalarWhereInput = {
  id?: number | IntFilter | null
  post_id?: number | IntFilter | null
  tag_id?: number | IntFilter | null
  AND?: Enumerable<Post_TagScalarWhereInput> | null
  OR?: Enumerable<Post_TagScalarWhereInput> | null
  NOT?: Enumerable<Post_TagScalarWhereInput> | null
}

export type Post_TagUpdateManyDataInput = {
  id?: number | null
}

export type Post_TagUpdateManyWithWhereNestedInput = {
  where: Post_TagScalarWhereInput
  data: Post_TagUpdateManyDataInput
}

export type Post_TagUpsertWithWhereUniqueWithoutPostInput = {
  where: Post_TagWhereUniqueInput
  update: Post_TagUpdateWithoutPostDataInput
  create: Post_TagCreateWithoutPostInput
}

export type Post_TagUpdateManyWithoutPostInput = {
  create?: Enumerable<Post_TagCreateWithoutPostInput> | null
  connect?: Enumerable<Post_TagWhereUniqueInput> | null
  set?: Enumerable<Post_TagWhereUniqueInput> | null
  disconnect?: Enumerable<Post_TagWhereUniqueInput> | null
  delete?: Enumerable<Post_TagWhereUniqueInput> | null
  update?: Enumerable<Post_TagUpdateWithWhereUniqueWithoutPostInput> | null
  updateMany?: Enumerable<Post_TagUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<Post_TagScalarWhereInput> | null
  upsert?: Enumerable<Post_TagUpsertWithWhereUniqueWithoutPostInput> | null
}

export type PostUpdateWithoutClapsDataInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content?: string | null
  id?: number | null
  author?: UserUpdateOneRequiredWithoutPostsInput | null
  comments?: CommentUpdateManyWithoutPostInput | null
  post_tags?: Post_TagUpdateManyWithoutPostInput | null
}

export type PostUpsertWithoutClapsInput = {
  update: PostUpdateWithoutClapsDataInput
  create: PostCreateWithoutClapsInput
}

export type PostUpdateOneRequiredWithoutClapsInput = {
  create?: PostCreateWithoutClapsInput | null
  connect?: PostWhereUniqueInput | null
  update?: PostUpdateWithoutClapsDataInput | null
  upsert?: PostUpsertWithoutClapsInput | null
}

export type Post_ClapUpdateWithoutAuthorDataInput = {
  id?: number | null
  post?: PostUpdateOneRequiredWithoutClapsInput | null
}

export type Post_ClapUpdateWithWhereUniqueWithoutAuthorInput = {
  where: Post_ClapWhereUniqueInput
  data: Post_ClapUpdateWithoutAuthorDataInput
}

export type Post_ClapScalarWhereInput = {
  author_id?: number | IntFilter | null
  id?: number | IntFilter | null
  post_id?: number | IntFilter | null
  AND?: Enumerable<Post_ClapScalarWhereInput> | null
  OR?: Enumerable<Post_ClapScalarWhereInput> | null
  NOT?: Enumerable<Post_ClapScalarWhereInput> | null
}

export type Post_ClapUpdateManyDataInput = {
  id?: number | null
}

export type Post_ClapUpdateManyWithWhereNestedInput = {
  where: Post_ClapScalarWhereInput
  data: Post_ClapUpdateManyDataInput
}

export type Post_ClapUpsertWithWhereUniqueWithoutAuthorInput = {
  where: Post_ClapWhereUniqueInput
  update: Post_ClapUpdateWithoutAuthorDataInput
  create: Post_ClapCreateWithoutAuthorInput
}

export type Post_ClapUpdateManyWithoutAuthorInput = {
  create?: Enumerable<Post_ClapCreateWithoutAuthorInput> | null
  connect?: Enumerable<Post_ClapWhereUniqueInput> | null
  set?: Enumerable<Post_ClapWhereUniqueInput> | null
  disconnect?: Enumerable<Post_ClapWhereUniqueInput> | null
  delete?: Enumerable<Post_ClapWhereUniqueInput> | null
  update?: Enumerable<Post_ClapUpdateWithWhereUniqueWithoutAuthorInput> | null
  updateMany?: Enumerable<Post_ClapUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<Post_ClapScalarWhereInput> | null
  upsert?: Enumerable<Post_ClapUpsertWithWhereUniqueWithoutAuthorInput> | null
}

export type UserUpdateWithoutFollowersDataInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
  comments?: CommentUpdateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutAuthorInput | null
  following?: FollowUpdateManyWithoutFollowingInput | null
  posts?: PostUpdateManyWithoutAuthorInput | null
  post_claps?: Post_ClapUpdateManyWithoutAuthorInput | null
}

export type UserUpsertWithoutFollowersInput = {
  update: UserUpdateWithoutFollowersDataInput
  create: UserCreateWithoutFollowersInput
}

export type UserUpdateOneRequiredWithoutFollowersInput = {
  create?: UserCreateWithoutFollowersInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutFollowersDataInput | null
  upsert?: UserUpsertWithoutFollowersInput | null
}

export type FollowUpdateWithoutFollowingDataInput = {
  created_at?: Date | string | null
  id?: number | null
  followed?: UserUpdateOneRequiredWithoutFollowersInput | null
}

export type FollowUpdateWithWhereUniqueWithoutFollowingInput = {
  where: FollowWhereUniqueInput
  data: FollowUpdateWithoutFollowingDataInput
}

export type FollowScalarWhereInput = {
  created_at?: Date | string | NullableDateTimeFilter | null
  followed_user_id?: number | IntFilter | null
  following_user_id?: number | IntFilter | null
  id?: number | IntFilter | null
  AND?: Enumerable<FollowScalarWhereInput> | null
  OR?: Enumerable<FollowScalarWhereInput> | null
  NOT?: Enumerable<FollowScalarWhereInput> | null
}

export type FollowUpdateManyDataInput = {
  created_at?: Date | string | null
  id?: number | null
}

export type FollowUpdateManyWithWhereNestedInput = {
  where: FollowScalarWhereInput
  data: FollowUpdateManyDataInput
}

export type FollowUpsertWithWhereUniqueWithoutFollowingInput = {
  where: FollowWhereUniqueInput
  update: FollowUpdateWithoutFollowingDataInput
  create: FollowCreateWithoutFollowingInput
}

export type FollowUpdateManyWithoutFollowingInput = {
  create?: Enumerable<FollowCreateWithoutFollowingInput> | null
  connect?: Enumerable<FollowWhereUniqueInput> | null
  set?: Enumerable<FollowWhereUniqueInput> | null
  disconnect?: Enumerable<FollowWhereUniqueInput> | null
  delete?: Enumerable<FollowWhereUniqueInput> | null
  update?: Enumerable<FollowUpdateWithWhereUniqueWithoutFollowingInput> | null
  updateMany?: Enumerable<FollowUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<FollowScalarWhereInput> | null
  upsert?: Enumerable<FollowUpsertWithWhereUniqueWithoutFollowingInput> | null
}

export type UserUpdateWithoutPost_clapsDataInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
  comments?: CommentUpdateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutAuthorInput | null
  followers?: FollowUpdateManyWithoutFollowedInput | null
  following?: FollowUpdateManyWithoutFollowingInput | null
  posts?: PostUpdateManyWithoutAuthorInput | null
}

export type UserUpsertWithoutPost_clapsInput = {
  update: UserUpdateWithoutPost_clapsDataInput
  create: UserCreateWithoutPost_clapsInput
}

export type UserUpdateOneRequiredWithoutPost_clapsInput = {
  create?: UserCreateWithoutPost_clapsInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutPost_clapsDataInput | null
  upsert?: UserUpsertWithoutPost_clapsInput | null
}

export type Post_ClapUpdateWithoutPostDataInput = {
  id?: number | null
  author?: UserUpdateOneRequiredWithoutPost_clapsInput | null
}

export type Post_ClapUpdateWithWhereUniqueWithoutPostInput = {
  where: Post_ClapWhereUniqueInput
  data: Post_ClapUpdateWithoutPostDataInput
}

export type Post_ClapUpsertWithWhereUniqueWithoutPostInput = {
  where: Post_ClapWhereUniqueInput
  update: Post_ClapUpdateWithoutPostDataInput
  create: Post_ClapCreateWithoutPostInput
}

export type Post_ClapUpdateManyWithoutPostInput = {
  create?: Enumerable<Post_ClapCreateWithoutPostInput> | null
  connect?: Enumerable<Post_ClapWhereUniqueInput> | null
  set?: Enumerable<Post_ClapWhereUniqueInput> | null
  disconnect?: Enumerable<Post_ClapWhereUniqueInput> | null
  delete?: Enumerable<Post_ClapWhereUniqueInput> | null
  update?: Enumerable<Post_ClapUpdateWithWhereUniqueWithoutPostInput> | null
  updateMany?: Enumerable<Post_ClapUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<Post_ClapScalarWhereInput> | null
  upsert?: Enumerable<Post_ClapUpsertWithWhereUniqueWithoutPostInput> | null
}

export type PostUpdateWithoutAuthorDataInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content?: string | null
  id?: number | null
  comments?: CommentUpdateManyWithoutPostInput | null
  claps?: Post_ClapUpdateManyWithoutPostInput | null
  post_tags?: Post_TagUpdateManyWithoutPostInput | null
}

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

export type PostScalarWhereInput = {
  created_at?: Date | string | NullableDateTimeFilter | null
  attatchment_url?: string | NullableStringFilter | null
  author_id?: number | IntFilter | null
  content?: string | StringFilter | null
  id?: number | IntFilter | null
  comments?: CommentFilter | null
  claps?: Post_ClapFilter | null
  post_tags?: Post_TagFilter | null
  AND?: Enumerable<PostScalarWhereInput> | null
  OR?: Enumerable<PostScalarWhereInput> | null
  NOT?: Enumerable<PostScalarWhereInput> | null
}

export type PostUpdateManyDataInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content?: string | null
  id?: number | null
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export type PostUpdateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput> | null
  connect?: Enumerable<PostWhereUniqueInput> | null
  set?: Enumerable<PostWhereUniqueInput> | null
  disconnect?: Enumerable<PostWhereUniqueInput> | null
  delete?: Enumerable<PostWhereUniqueInput> | null
  update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput> | null
  updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<PostScalarWhereInput> | null
  upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput> | null
}

export type UserUpdateWithoutFollowingDataInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
  comments?: CommentUpdateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutAuthorInput | null
  followers?: FollowUpdateManyWithoutFollowedInput | null
  posts?: PostUpdateManyWithoutAuthorInput | null
  post_claps?: Post_ClapUpdateManyWithoutAuthorInput | null
}

export type UserUpsertWithoutFollowingInput = {
  update: UserUpdateWithoutFollowingDataInput
  create: UserCreateWithoutFollowingInput
}

export type UserUpdateOneRequiredWithoutFollowingInput = {
  create?: UserCreateWithoutFollowingInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutFollowingDataInput | null
  upsert?: UserUpsertWithoutFollowingInput | null
}

export type FollowUpdateWithoutFollowedDataInput = {
  created_at?: Date | string | null
  id?: number | null
  following?: UserUpdateOneRequiredWithoutFollowingInput | null
}

export type FollowUpdateWithWhereUniqueWithoutFollowedInput = {
  where: FollowWhereUniqueInput
  data: FollowUpdateWithoutFollowedDataInput
}

export type FollowUpsertWithWhereUniqueWithoutFollowedInput = {
  where: FollowWhereUniqueInput
  update: FollowUpdateWithoutFollowedDataInput
  create: FollowCreateWithoutFollowedInput
}

export type FollowUpdateManyWithoutFollowedInput = {
  create?: Enumerable<FollowCreateWithoutFollowedInput> | null
  connect?: Enumerable<FollowWhereUniqueInput> | null
  set?: Enumerable<FollowWhereUniqueInput> | null
  disconnect?: Enumerable<FollowWhereUniqueInput> | null
  delete?: Enumerable<FollowWhereUniqueInput> | null
  update?: Enumerable<FollowUpdateWithWhereUniqueWithoutFollowedInput> | null
  updateMany?: Enumerable<FollowUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<FollowScalarWhereInput> | null
  upsert?: Enumerable<FollowUpsertWithWhereUniqueWithoutFollowedInput> | null
}

export type UserUpdateWithoutComment_clapsDataInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
  comments?: CommentUpdateManyWithoutAuthorInput | null
  followers?: FollowUpdateManyWithoutFollowedInput | null
  following?: FollowUpdateManyWithoutFollowingInput | null
  posts?: PostUpdateManyWithoutAuthorInput | null
  post_claps?: Post_ClapUpdateManyWithoutAuthorInput | null
}

export type UserUpsertWithoutComment_clapsInput = {
  update: UserUpdateWithoutComment_clapsDataInput
  create: UserCreateWithoutComment_clapsInput
}

export type UserUpdateOneRequiredWithoutComment_clapsInput = {
  create?: UserCreateWithoutComment_clapsInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutComment_clapsDataInput | null
  upsert?: UserUpsertWithoutComment_clapsInput | null
}

export type Comment_ClapUpdateWithoutCommentDataInput = {
  id?: number | null
  author?: UserUpdateOneRequiredWithoutComment_clapsInput | null
}

export type Comment_ClapUpdateWithWhereUniqueWithoutCommentInput = {
  where: Comment_ClapWhereUniqueInput
  data: Comment_ClapUpdateWithoutCommentDataInput
}

export type Comment_ClapScalarWhereInput = {
  author_id?: number | IntFilter | null
  comment_id?: number | IntFilter | null
  id?: number | IntFilter | null
  AND?: Enumerable<Comment_ClapScalarWhereInput> | null
  OR?: Enumerable<Comment_ClapScalarWhereInput> | null
  NOT?: Enumerable<Comment_ClapScalarWhereInput> | null
}

export type Comment_ClapUpdateManyDataInput = {
  id?: number | null
}

export type Comment_ClapUpdateManyWithWhereNestedInput = {
  where: Comment_ClapScalarWhereInput
  data: Comment_ClapUpdateManyDataInput
}

export type Comment_ClapUpsertWithWhereUniqueWithoutCommentInput = {
  where: Comment_ClapWhereUniqueInput
  update: Comment_ClapUpdateWithoutCommentDataInput
  create: Comment_ClapCreateWithoutCommentInput
}

export type Comment_ClapUpdateManyWithoutCommentInput = {
  create?: Enumerable<Comment_ClapCreateWithoutCommentInput> | null
  connect?: Enumerable<Comment_ClapWhereUniqueInput> | null
  set?: Enumerable<Comment_ClapWhereUniqueInput> | null
  disconnect?: Enumerable<Comment_ClapWhereUniqueInput> | null
  delete?: Enumerable<Comment_ClapWhereUniqueInput> | null
  update?: Enumerable<Comment_ClapUpdateWithWhereUniqueWithoutCommentInput> | null
  updateMany?: Enumerable<Comment_ClapUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<Comment_ClapScalarWhereInput> | null
  upsert?: Enumerable<Comment_ClapUpsertWithWhereUniqueWithoutCommentInput> | null
}

export type CommentUpdateWithoutAuthorDataInput = {
  created_at?: Date | string | null
  content?: string | null
  id?: number | null
  post?: PostUpdateOneRequiredWithoutCommentsInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutCommentInput | null
}

export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutAuthorDataInput
}

export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutAuthorDataInput
  create: CommentCreateWithoutAuthorInput
}

export type CommentUpdateManyWithoutAuthorInput = {
  create?: Enumerable<CommentCreateWithoutAuthorInput> | null
  connect?: Enumerable<CommentWhereUniqueInput> | null
  set?: Enumerable<CommentWhereUniqueInput> | null
  disconnect?: Enumerable<CommentWhereUniqueInput> | null
  delete?: Enumerable<CommentWhereUniqueInput> | null
  update?: Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput> | null
  updateMany?: Enumerable<CommentUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<CommentScalarWhereInput> | null
  upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput> | null
}

export type UserUpdateWithoutPostsDataInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
  comments?: CommentUpdateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutAuthorInput | null
  followers?: FollowUpdateManyWithoutFollowedInput | null
  following?: FollowUpdateManyWithoutFollowingInput | null
  post_claps?: Post_ClapUpdateManyWithoutAuthorInput | null
}

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export type UserUpdateOneRequiredWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutPostsDataInput | null
  upsert?: UserUpsertWithoutPostsInput | null
}

export type PostUpdateWithoutCommentsDataInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content?: string | null
  id?: number | null
  author?: UserUpdateOneRequiredWithoutPostsInput | null
  claps?: Post_ClapUpdateManyWithoutPostInput | null
  post_tags?: Post_TagUpdateManyWithoutPostInput | null
}

export type PostUpsertWithoutCommentsInput = {
  update: PostUpdateWithoutCommentsDataInput
  create: PostCreateWithoutCommentsInput
}

export type PostUpdateOneRequiredWithoutCommentsInput = {
  create?: PostCreateWithoutCommentsInput | null
  connect?: PostWhereUniqueInput | null
  update?: PostUpdateWithoutCommentsDataInput | null
  upsert?: PostUpsertWithoutCommentsInput | null
}

export type CommentUpdateWithoutComment_clapsDataInput = {
  created_at?: Date | string | null
  content?: string | null
  id?: number | null
  author?: UserUpdateOneRequiredWithoutCommentsInput | null
  post?: PostUpdateOneRequiredWithoutCommentsInput | null
}

export type CommentUpsertWithoutComment_clapsInput = {
  update: CommentUpdateWithoutComment_clapsDataInput
  create: CommentCreateWithoutComment_clapsInput
}

export type CommentUpdateOneRequiredWithoutComment_clapsInput = {
  create?: CommentCreateWithoutComment_clapsInput | null
  connect?: CommentWhereUniqueInput | null
  update?: CommentUpdateWithoutComment_clapsDataInput | null
  upsert?: CommentUpsertWithoutComment_clapsInput | null
}

export type Comment_ClapUpdateWithoutAuthorDataInput = {
  id?: number | null
  comment?: CommentUpdateOneRequiredWithoutComment_clapsInput | null
}

export type Comment_ClapUpdateWithWhereUniqueWithoutAuthorInput = {
  where: Comment_ClapWhereUniqueInput
  data: Comment_ClapUpdateWithoutAuthorDataInput
}

export type Comment_ClapUpsertWithWhereUniqueWithoutAuthorInput = {
  where: Comment_ClapWhereUniqueInput
  update: Comment_ClapUpdateWithoutAuthorDataInput
  create: Comment_ClapCreateWithoutAuthorInput
}

export type Comment_ClapUpdateManyWithoutAuthorInput = {
  create?: Enumerable<Comment_ClapCreateWithoutAuthorInput> | null
  connect?: Enumerable<Comment_ClapWhereUniqueInput> | null
  set?: Enumerable<Comment_ClapWhereUniqueInput> | null
  disconnect?: Enumerable<Comment_ClapWhereUniqueInput> | null
  delete?: Enumerable<Comment_ClapWhereUniqueInput> | null
  update?: Enumerable<Comment_ClapUpdateWithWhereUniqueWithoutAuthorInput> | null
  updateMany?: Enumerable<Comment_ClapUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<Comment_ClapScalarWhereInput> | null
  upsert?: Enumerable<Comment_ClapUpsertWithWhereUniqueWithoutAuthorInput> | null
}

export type UserUpdateWithoutCommentsDataInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
  comment_claps?: Comment_ClapUpdateManyWithoutAuthorInput | null
  followers?: FollowUpdateManyWithoutFollowedInput | null
  following?: FollowUpdateManyWithoutFollowingInput | null
  posts?: PostUpdateManyWithoutAuthorInput | null
  post_claps?: Post_ClapUpdateManyWithoutAuthorInput | null
}

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsDataInput
  create: UserCreateWithoutCommentsInput
}

export type UserUpdateOneRequiredWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutCommentsDataInput | null
  upsert?: UserUpsertWithoutCommentsInput | null
}

export type CommentUpdateInput = {
  created_at?: Date | string | null
  content?: string | null
  id?: number | null
  author?: UserUpdateOneRequiredWithoutCommentsInput | null
  post?: PostUpdateOneRequiredWithoutCommentsInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutCommentInput | null
}

export type CommentUpdateManyMutationInput = {
  created_at?: Date | string | null
  content?: string | null
  id?: number | null
}

export type Comment_ClapCreateInput = {
  author: UserCreateOneWithoutComment_clapsInput
  comment: CommentCreateOneWithoutComment_clapsInput
}

export type Comment_ClapUpdateInput = {
  id?: number | null
  author?: UserUpdateOneRequiredWithoutComment_clapsInput | null
  comment?: CommentUpdateOneRequiredWithoutComment_clapsInput | null
}

export type Comment_ClapUpdateManyMutationInput = {
  id?: number | null
}

export type PostCreateInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content: string
  author: UserCreateOneWithoutPostsInput
  comments?: CommentCreateManyWithoutPostInput | null
  claps?: Post_ClapCreateManyWithoutPostInput | null
  post_tags?: Post_TagCreateManyWithoutPostInput | null
}

export type PostUpdateInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content?: string | null
  id?: number | null
  author?: UserUpdateOneRequiredWithoutPostsInput | null
  comments?: CommentUpdateManyWithoutPostInput | null
  claps?: Post_ClapUpdateManyWithoutPostInput | null
  post_tags?: Post_TagUpdateManyWithoutPostInput | null
}

export type PostUpdateManyMutationInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content?: string | null
  id?: number | null
}

export type Post_ClapCreateInput = {
  author: UserCreateOneWithoutPost_clapsInput
  post: PostCreateOneWithoutClapsInput
}

export type Post_ClapUpdateInput = {
  id?: number | null
  author?: UserUpdateOneRequiredWithoutPost_clapsInput | null
  post?: PostUpdateOneRequiredWithoutClapsInput | null
}

export type Post_ClapUpdateManyMutationInput = {
  id?: number | null
}

export type PostCreateWithoutPost_tagsInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content: string
  author: UserCreateOneWithoutPostsInput
  comments?: CommentCreateManyWithoutPostInput | null
  claps?: Post_ClapCreateManyWithoutPostInput | null
}

export type PostCreateOneWithoutPost_tagsInput = {
  create?: PostCreateWithoutPost_tagsInput | null
  connect?: PostWhereUniqueInput | null
}

export type Post_TagCreateInput = {
  post: PostCreateOneWithoutPost_tagsInput
  tag: TagCreateOneWithoutPost_tagsInput
}

export type PostUpdateWithoutPost_tagsDataInput = {
  created_at?: Date | string | null
  attatchment_url?: string | null
  content?: string | null
  id?: number | null
  author?: UserUpdateOneRequiredWithoutPostsInput | null
  comments?: CommentUpdateManyWithoutPostInput | null
  claps?: Post_ClapUpdateManyWithoutPostInput | null
}

export type PostUpsertWithoutPost_tagsInput = {
  update: PostUpdateWithoutPost_tagsDataInput
  create: PostCreateWithoutPost_tagsInput
}

export type PostUpdateOneRequiredWithoutPost_tagsInput = {
  create?: PostCreateWithoutPost_tagsInput | null
  connect?: PostWhereUniqueInput | null
  update?: PostUpdateWithoutPost_tagsDataInput | null
  upsert?: PostUpsertWithoutPost_tagsInput | null
}

export type Post_TagUpdateInput = {
  id?: number | null
  post?: PostUpdateOneRequiredWithoutPost_tagsInput | null
  tag?: TagUpdateOneRequiredWithoutPost_tagsInput | null
}

export type Post_TagUpdateManyMutationInput = {
  id?: number | null
}

export type Post_TagCreateWithoutTagInput = {
  post: PostCreateOneWithoutPost_tagsInput
}

export type Post_TagCreateManyWithoutTagInput = {
  create?: Enumerable<Post_TagCreateWithoutTagInput> | null
  connect?: Enumerable<Post_TagWhereUniqueInput> | null
}

export type TagCreateInput = {
  tag?: string | null
  post_tags?: Post_TagCreateManyWithoutTagInput | null
}

export type Post_TagUpdateWithoutTagDataInput = {
  id?: number | null
  post?: PostUpdateOneRequiredWithoutPost_tagsInput | null
}

export type Post_TagUpdateWithWhereUniqueWithoutTagInput = {
  where: Post_TagWhereUniqueInput
  data: Post_TagUpdateWithoutTagDataInput
}

export type Post_TagUpsertWithWhereUniqueWithoutTagInput = {
  where: Post_TagWhereUniqueInput
  update: Post_TagUpdateWithoutTagDataInput
  create: Post_TagCreateWithoutTagInput
}

export type Post_TagUpdateManyWithoutTagInput = {
  create?: Enumerable<Post_TagCreateWithoutTagInput> | null
  connect?: Enumerable<Post_TagWhereUniqueInput> | null
  set?: Enumerable<Post_TagWhereUniqueInput> | null
  disconnect?: Enumerable<Post_TagWhereUniqueInput> | null
  delete?: Enumerable<Post_TagWhereUniqueInput> | null
  update?: Enumerable<Post_TagUpdateWithWhereUniqueWithoutTagInput> | null
  updateMany?: Enumerable<Post_TagUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<Post_TagScalarWhereInput> | null
  upsert?: Enumerable<Post_TagUpsertWithWhereUniqueWithoutTagInput> | null
}

export type TagUpdateInput = {
  id?: number | null
  tag?: string | null
  post_tags?: Post_TagUpdateManyWithoutTagInput | null
}

export type TagUpdateManyMutationInput = {
  id?: number | null
  tag?: string | null
}

export type FollowCreateInput = {
  created_at?: Date | string | null
  followed: UserCreateOneWithoutFollowersInput
  following: UserCreateOneWithoutFollowingInput
}

export type FollowUpdateInput = {
  created_at?: Date | string | null
  id?: number | null
  followed?: UserUpdateOneRequiredWithoutFollowersInput | null
  following?: UserUpdateOneRequiredWithoutFollowingInput | null
}

export type FollowUpdateManyMutationInput = {
  created_at?: Date | string | null
  id?: number | null
}

export type UserCreateInput = {
  created_at?: Date | string | null
  email: string
  first: string
  last: string
  location: string
  password: string
  phone: string
  profile_pic_url: string
  username: string
  role_type?: role_enum | null
  comments?: CommentCreateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapCreateManyWithoutAuthorInput | null
  followers?: FollowCreateManyWithoutFollowedInput | null
  following?: FollowCreateManyWithoutFollowingInput | null
  posts?: PostCreateManyWithoutAuthorInput | null
  post_claps?: Post_ClapCreateManyWithoutAuthorInput | null
}

export type UserUpdateInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
  comments?: CommentUpdateManyWithoutAuthorInput | null
  comment_claps?: Comment_ClapUpdateManyWithoutAuthorInput | null
  followers?: FollowUpdateManyWithoutFollowedInput | null
  following?: FollowUpdateManyWithoutFollowingInput | null
  posts?: PostUpdateManyWithoutAuthorInput | null
  post_claps?: Post_ClapUpdateManyWithoutAuthorInput | null
}

export type UserUpdateManyMutationInput = {
  created_at?: Date | string | null
  email?: string | null
  first?: string | null
  id?: number | null
  last?: string | null
  location?: string | null
  password?: string | null
  phone?: string | null
  profile_pic_url?: string | null
  username?: string | null
  role_type?: role_enum | null
}

export type IntFilter = {
  equals?: number | null
  not?: number | IntFilter | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type NullableDateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | null | NullableDateTimeFilter
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type Post_TagFilter = {
  every?: Post_TagWhereInput | null
  some?: Post_TagWhereInput | null
  none?: Post_TagWhereInput | null
}

export type StringFilter = {
  equals?: string | null
  not?: string | StringFilter | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type CommentFilter = {
  every?: CommentWhereInput | null
  some?: CommentWhereInput | null
  none?: CommentWhereInput | null
}

export type Post_ClapFilter = {
  every?: Post_ClapWhereInput | null
  some?: Post_ClapWhereInput | null
  none?: Post_ClapWhereInput | null
}

export type Nullablerole_enumFilter = {
  equals?: role_enum | null
  not?: role_enum | null | Nullablerole_enumFilter
  in?: Enumerable<role_enum> | null
  notIn?: Enumerable<role_enum> | null
}

export type Comment_ClapFilter = {
  every?: Comment_ClapWhereInput | null
  some?: Comment_ClapWhereInput | null
  none?: Comment_ClapWhereInput | null
}

export type FollowFilter = {
  every?: FollowWhereInput | null
  some?: FollowWhereInput | null
  none?: FollowWhereInput | null
}

export type PostFilter = {
  every?: PostWhereInput | null
  some?: PostWhereInput | null
  none?: PostWhereInput | null
}

export type CommentOrderByInput = {
  created_at?: OrderByArg | null
  author_id?: OrderByArg | null
  content?: OrderByArg | null
  id?: OrderByArg | null
  post_id?: OrderByArg | null
}

export type Comment_ClapOrderByInput = {
  author_id?: OrderByArg | null
  comment_id?: OrderByArg | null
  id?: OrderByArg | null
}

export type FollowOrderByInput = {
  created_at?: OrderByArg | null
  followed_user_id?: OrderByArg | null
  following_user_id?: OrderByArg | null
  id?: OrderByArg | null
}

export type PostOrderByInput = {
  created_at?: OrderByArg | null
  attatchment_url?: OrderByArg | null
  author_id?: OrderByArg | null
  content?: OrderByArg | null
  id?: OrderByArg | null
}

export type Post_ClapOrderByInput = {
  author_id?: OrderByArg | null
  id?: OrderByArg | null
  post_id?: OrderByArg | null
}

export type Post_TagOrderByInput = {
  id?: OrderByArg | null
  post_id?: OrderByArg | null
  tag_id?: OrderByArg | null
}

export type TagOrderByInput = {
  id?: OrderByArg | null
  tag?: OrderByArg | null
}

export type UserOrderByInput = {
  created_at?: OrderByArg | null
  email?: OrderByArg | null
  first?: OrderByArg | null
  id?: OrderByArg | null
  last?: OrderByArg | null
  location?: OrderByArg | null
  password?: OrderByArg | null
  phone?: OrderByArg | null
  profile_pic_url?: OrderByArg | null
  username?: OrderByArg | null
  role_type?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
