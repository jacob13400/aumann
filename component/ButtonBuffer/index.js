import styles from './styles.module.css'

export default function ButtonBuffer({isAdmin, text, action}) {
  if(isAdmin) {
    return (
      <a className={styles.link} onClick={action} style={{textDecoration: 'none'}}>
        <div className={styles.container}>
          <div className={styles.text}>
            {text}
          </div>
        </div>
      </a>
    )
  }
  else {
    return (
      <div className={styles.lock}>
        <div className={styles.container}>
          <div className={styles.text}>
            Wait for Admin
          </div>
        </div>
      </div>
    )
  }
}