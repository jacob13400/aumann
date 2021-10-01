import styles from './styles.module.css'

export default function Credits() { 
  return (
    <div className={styles.bottom}>
      <div className={styles.left}>
        <div className={styles.bottomHead}>
          Developers
        </div>
        <div className={styles.names}>
          <br/>
          <a href="https://www.jozdien.com/" style={{textDecoration: 'none', color: '#606060'}}>jozdien</a>
          <br/>
          <a href="https://jacobabraham.live/" style={{textDecoration: 'none', color: '#606060'}}>zeref</a>
          <br/>
          <a href="" style={{textDecoration: 'none', color: '#606060'}}>su</a>
          <br/>
          <a href="" style={{textDecoration: 'none', color: '#606060'}}>whybevicky</a>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.bottomHead}>
          Creators
        </div>
        <div className={styles.names}>
          <br/>
          <a href="http://scott.garrabrant.com/" style={{textDecoration: 'none', color: '#606060'}}>Scott Garrabrant</a>
          <br/>
          <a href="https://www.alignmentforum.org/users/abramdemski" style={{textDecoration: 'none', color: '#606060'}}>Abram Demski</a>
        </div>
      </div>
    </div>
  )
}