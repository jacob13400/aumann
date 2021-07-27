import styles from './styles.module.css';

export default function RoomFooter(props) {
  var seconds = props.seconds.toString();
  var minutes = props.minutes.toString();
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }

  return (
    <div className={styles.bottom}>
      <div className={styles.timer}>
        {minutes} : {seconds}
      </div>
    </div>
  )
}