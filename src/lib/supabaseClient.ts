// MOCK SUPABASE CLIENT - DISABLING SUPABASE TEMPORARILY
// This mock prevents errors when supabase is not configured or the library is missing.

const mockResult = {
  data: [],
  error: null,
  count: 0,
  status: 200,
  statusText: "OK",
};

const mockHandler = {
  get: function(target: any, prop: string): any {
    if (prop === 'from') {
      return () => new Proxy({}, mockHandler);
    }
    if (['select', 'insert', 'update', 'delete', 'upsert', 'eq', 'order', 'single', 'limit', 'range', 'match', 'or', 'filter'].includes(prop)) {
      return () => new Proxy(mockResult, mockHandler);
    }
    if (prop === 'then') {
      return (cb: any) => Promise.resolve(cb(mockResult));
    }
    return target[prop] || (() => new Proxy(mockResult, mockHandler));
  }
};

export const supabase = new Proxy({}, mockHandler) as any;
