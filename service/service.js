module.exports = {
  responseData: async(payload, status, message) => {
    let res = {}
    if (payload) res.payload = payload;
    if (status) res.status = status;
    if (message) res.message = message;
    return res
  }
}