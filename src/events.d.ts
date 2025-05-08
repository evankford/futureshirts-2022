declare namespace svelte.JSX {
  interface HTMLProps<T> {
    ononscreen?: (e) => void
    onoffscreen?: (e) => void
    onswipeleft?: (e)=>void
    onswiperight?: (e)=>void
  }
}
export {};
