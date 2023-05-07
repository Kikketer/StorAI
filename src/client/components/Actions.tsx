import logoutWasp from '@wasp/auth/logout.js'
import styles from './actions.module.css'
import abandonCharacter from '@wasp/actions/abandonCharacter'

const useActions = () => {
  const reset = () => {
    abandonCharacter()
  }

  return {
    logout: logoutWasp,
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
