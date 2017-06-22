export const offlineCheck = () => new Promise((resolve, reject) => {
  const xhr = Offline.check();
  const [_onload, _onerror, _ontimeout, _onreadystatechange] =
    [xhr.onload, xhr.onerror, xhr.ontimeout, xhr.onreadystatechange];
  if (_onload) {
    xhr.onload = () => resolve(_onload.call(xhr));
  }
  if (_onerror) {
    xhr.onerror = () => resolve(_onerror.call(xhr));
  }
  if (_ontimeout) {
    xhr.ontimeout = () => resolve(_ontimeout.call(xhr));
  }
  if (_onreadystatechange) {
    xhr.onreadystatechange = () => resolve(_onreadystatechange.call(xhr));
  }
});
