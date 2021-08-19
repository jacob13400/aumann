export const getScore = async (query) => {
  
  var result = 100 * Math.log2(4*query.estimate/100);
  
  if (query.answer == false) result = 100 * Math.log2(4*(1-query.estimate)/300);

  return result;
}