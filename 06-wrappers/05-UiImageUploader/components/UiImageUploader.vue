<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{'image-uploader__preview-loading': state=='loading'}"
      :style="imgUploaderPreviewBg"
    >
      <span class="image-uploader__text">{{ $options.uploader_state_note[state] }}</span>
      <input
        type="file"
        v-bind="$attrs"
        accept="image/*"
        class="image-uploader__input"
        @[inputEvent].prevent="inputEventHandler"
        
      />
    </label>
  </div>
</template>

<script>
const uploader_state_note = {
  loading: 'Загрузка...',
  empty: 'Загрузить изображение',
  delete: 'Удалить изображение',
}

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  uploader_state_note,

  props: {
    preview: {
      type: String,
      default: undefined,
    },
    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'remove', 'upload', 'error'],

  data() {
    return {
      state: 'empty',
    }
  },

  computed: {
    imgUploaderPreviewBg() {
      return this.preview ? `--bg-url: url('${this.preview}')` : undefined
    },
    inputEvent() {
      return this.state === 'delete' ? 'click' : 'change'
    },
  },

  methods: {
    inputEventHandler(ev) {
      if(this.state === 'loading') {
        return
      } else if(ev.type === 'click') {
        this.$emit('remove')
        this.state = 'empty'
        ev.target.value = ''
      } else {
        this.$emit('select', ev.target.files[0])
        if(this.uploader) {
          this.state = 'loading'
          this.uploader(ev.target.files[0])
            .then((res) => {
              this.$emit('upload', res) 
              this.state = 'delete'
            })
            .catch((err) => {
              this.$emit('error', err)
              this.state = this.preview ? 'delete' : 'empty'
              ev.target.value = ''
            })
        } else { // uploader не задан
          this.state = 'delete'
        }
      }
    
    },
  },

  created() {
    this.state = this.preview ? 'delete' : 'empty'
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
