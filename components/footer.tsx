import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          Built by <a href="https://astrosaurus.me">Ephraim Atta-Duncan</a>
        </li>
      </ul>
    </footer>
  )
}
