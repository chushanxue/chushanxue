import styles from './{{{name}}}{{{ cssExt }}}';

 const  Page = () => {
  return (
    <div>
      <p className={styles.title}>This is  {{{ name }}}.</p>
    </div>
  );
}

export default Page
