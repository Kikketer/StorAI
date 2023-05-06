import styles from './actions.module.css'

const useActions = () => {
  const logout = () => {}

  const reset = () => {}

  return {
    logout,
    reset,
  }
}

export const Actions = () => {
  const { logout, reset } = useActions()

  return (
    <div className={styles.root}>
      <button type="button" onClick={logout}>
        Log Out
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  )
}

Actions.displayName = 'Actions'
