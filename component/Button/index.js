import styles from './styles.module.css'

export default function Button({type, text, action}) {
  if(type == "play" || type == "info") {
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
  else if(type == "modal") {
    return (
      <a className={styles.modal} onClick={action} style={{textDecoration: 'none'}}>
        <div className={styles.containerModal}>
          <div className={styles.textModal}>
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
            {text}
          </div>
        </div>
      </a>
    )
  }
}