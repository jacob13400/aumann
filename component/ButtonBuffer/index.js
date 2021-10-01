import styles from './styles.module.css'

export default function ButtonBuffer({isAdmin, text, action}) {
  if(isAdmin) {
    return (
      <a className={styles.link} onClick={action} style={{textDecoration: 'none'}}>
        <div className={styles.containerPI}>
          <div className={styles.textPI}>
            {text}
          </div>
        </div>
      </a>
    )
  }
  else {
    return (
      <a className={styles.lock} onClick={action} style={{textDecoration: 'none'}}>
        <div className={styles.containerLock}>
          <div className={styles.textLock}>
            Wait for Admin
          </div>
        </div>
      </a>
    )
  }
}