<template>
  <div class="about">
    <div class="d-flex justify-content-center">
      <router-link to="/"><h3>Get started</h3></router-link>
    </div>
    <div class="content d-flex flex-column align-items-center">
      <h1 class="m-4">Cron Push</h1>
      <h3 class="m-4">Push notification scheduler</h3>

      <p>
        Read my
        <a href="https://link.medium.com/oh9tyCHenab" target="_blank"
          >medium post</a
        >
      </p>

      <div
        class="instructions d-flex justify-content-center flex-wrap align-self-start align-items-start"
      >
        <div>
          <h5 class="mt-4">
            Step 1: Accept my notification permission request
          </h5>
          <img
            class="instructions"
            src="/instructions/notification-request.png"
          />
        </div>

        <div class="align-self-start">
          <h5>Step 2: Create a new schedule</h5>
          <div
            class="d-flex justify-content-center align-items-center position-relative m-3"
          >
            <div style="transform: scale(2);">
              <fab style="position: unset !important;" />
            </div>
            <i class="material-icons ml-3">arrow_right</i>
            <i class="material-icons">arrow_right</i>
            <i class="material-icons mr-3">arrow_right</i>
            <img src="/instructions/full-create-modal.png" />
          </div>
        </div>

        <div>
          <h5>Step 3: Choose an icon</h5>
          <img src="/instructions/choose-icon-modal.png" />
        </div>

        <div>
          <h5>Step 4: Choose a recipe</h5>
          <img src="/instructions/choose-recipe-modal.png" />
        </div>

        <div>
          <h5>Step 5: Create!</h5>
          <img src="/instructions/full-view.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about {
  background-color: white;
  height: 100%;
}

.content {
  overflow-y: scroll;
}

a:hover {
  color: black;
}

h5 {
  margin-left: 8px;
  font-family: 'Major Mono Display', monospace;
}

.instructions > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 24px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.03);
}

.instructions img {
  max-width: 350px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 4px;
}

@media only screen and (max-width: 500px) {
  .instructions {
    flex-direction: column;
  }

  .instructions img {
    width: 90vw;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import Fab from '../components/Fab.vue'

export default Vue.extend({
  components: { Fab },
})
</script>
