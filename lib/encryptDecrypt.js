export const convertData = (query) => {
    if (query.flag){
      return Buffer.from(query.message).toString('base64');
    }else {
      return Buffer.from(query.message, 'base64').toString('ascii');
    }
  }