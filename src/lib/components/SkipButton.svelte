<a href="#MainContent">Skip to main content</a>

<style lang="scss">
    @use "../styles/abstracts" as *;

  a {
    @include resetButton;
    @include buttonStyles;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(var(--color-base-background));
    display: block;
    border: 2px solid;
    color: rgb(var(--color-base-text));
    font-size: 20px;
    z-index: 101;

    &:not(:focus):not(:active) {
      @include visually-hidden;
    }
  }
</style>