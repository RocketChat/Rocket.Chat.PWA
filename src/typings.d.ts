/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var Offline: {
  options: OfflineOptions,
  state: 'up' | 'down',
  check: Function,
  on(event: string, handler: Function),
};

interface OfflineOptions {
  // Should we check the connection status immediatly on page load.
  checkOnLoad?: boolean;

  // Should we monitor AJAX requests to help decide if we have a connection.
  interceptRequests?: boolean;

  // Should we automatically retest periodically when the connection is down (set to false to disable).
  reconnect?: any;

  // Should we store and attempt to remake requests which fail while the connection is down.
  requests?: boolean;

  // Should we show a snake game while the connection is down to keep the user entertained?
  // It's not included in the normal build, you should bring in js/snake.js in addition to
  // offline.min.js.
  game?: false;

  checks?: any;
}
