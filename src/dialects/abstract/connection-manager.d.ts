export interface GetConnectionOptions {
  /**
   * Set which replica to use. Available options are `read` and `write`
   */
  type: 'read' | 'write';
  /**
   * Force master or write replica to get connection from
   */
  useMaster?: boolean;

  /**
   * ID of the connection.
   */
  uuid?: string | 'default';
}

export type Connection = {
  uuid: string | undefined
};

export interface ConnectionManager {
  refreshTypeParser(dataTypes: object): void;
  /**
   * Drain the pool and close it permanently
   */
  close(): Promise<void>;
  /**
   * Initialize connection pool. By default pool autostart is set to false, so no connection will be
   * be created unless `pool.acquire` is called.
   */
  initPools(): void;
  /**
   * Get connection from pool. It sets database version if it's not already set.
   * Call pool.acquire to get a connection.
   */
  getConnection(opts: GetConnectionOptions): Promise<Connection>;
  /**
   * Release a pooled connection so it can be utilized by other connection requests
   */
  releaseConnection(conn: Connection): Promise<void>;
  /**
   * Destroys a pooled connection so it can be utilized by other connection requests
   */
  destroyConnection(conn: Connection): Promise<void>;
}
