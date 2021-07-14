const db = require('../../lib/db')
const SQL = require('sql-template-strings')

module.exports = async (req, res) => {
  console.log(req.body)
  try{
    const result = await db.handler(SQL`
      SELECT *
      FROM rooms
      WHERE roomID=${req.body.roomID}
    `)
    console.log(result.length)
    if (result.length == 0){
      try{
        const room = await db.handler(SQL`
        INSERT
        INTO    rooms
                (roomID)
        VALUES  (${req.body.roomID})
      `)
        console.log(room)
      } catch (error) {
        console.log(error)
        res.status(500).json({error})
      }
    }
    else if (result.length != 1){
      res.status(500).json({result})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }

  try{
    const room = await db.handler(SQL`
      SELECT *
      FROM rooms
      WHERE roomID=${req.body.roomID}
    `)
    const result = await db.handler(SQL`
      SELECT *
      FROM users
      WHERE username=${req.body.username}
    `)
    console.log(result.length)
    if (result.length == 0){
      try{
        const user = await db.handler(SQL`
        INSERT
        INTO    users
                (username, roomID)
        VALUES  (${req.body.username}, ${room[0].id})
      `)
        console.log(user)
        res.status(200).json({result: {user: user, room: room[0]}});
      } catch (error) {
        console.log(error)
        res.status(500).json({error})
      }
    }
    else if (result.length == 1){
      try{
        const user = await db.handler(SQL`
        UPDATE users
        SET roomID=${room[0].id}
        WHERE id=${result[0].id}
      `)
      res.status(201).json({result: {user: user, room: room[0]}})
      }catch (error) {
        console.log(error)
        res.status(500).json({error})
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}