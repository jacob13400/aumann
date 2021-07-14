// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  var result = Math.log2(4*req.value)*100;
  res.statusCode = 200
  res.json({ message: 'Hey!\nThis is the co-author of this site. Nice to meet you\nBye!',
             value: result
        })
}
