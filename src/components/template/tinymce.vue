<template>
  <div class="tinymce">
    <textarea ref="editor" id="editor"></textarea>
  </div>
</template>

<script>
import '../../../static/tinymce/tinymce.min.js'
import '../../../static/tinymce/langs/zh_CN'
export default {
  data () {
    return {
      Editor: null,
      hasInit: false,
      menu1: `'styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor |','bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen '`,
      menu2: `| undo redo |fontselect | formatselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist | preview | code | fullscreen|`,
      DefaultConfig: {
        // 全局配置
        height: 500,
        theme: 'modern',
        toolbar: this.appearance ? this.menu1 : this.menu2,
        menubar: true,
        plugins: `paste importcss image code table advlist fullscreen link media lists textcolor colorpicker hr preview wordcount`,
        forced_root_block: 'p',
        force_p_newlines: true,
        importcss_append: true,
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
          html, body                { height:100%; box-sizing:border-box; padding:2px 4px; margin:0; }
          a                         { text-decoration:none; }
          iframe                    { width:100%; }
          p                         { line-height:1.6; margin:0px; }
          table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
          .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
          ul,ol                     { list-style-position:inside; }
        `,
        insert_button_items: 'image link | inserttable',
        // CONFIG: Paste
        paste_retain_style_properties: 'all',
        // word需要它
        paste_word_valid_elements: '*[*]',
        // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_data_images: true,
        // 插入word文档需要该属性
        paste_convert_word_fake_lists: false,
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // CONFIG: Font
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
        // CONFIG: StyleSelect
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
          },
          {
            title: '行高',
            items: [
              {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
              {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
              {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
              {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
              {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
            ]
          }
        ],
        // word Count
        wordcount_countregex: /[\w\u2019\x27\-\u00C0-\u1FFF]+/g,
        // FontSelect
        font_formats: `
          微软雅黑=微软雅黑;
          宋体=宋体;
          黑体=黑体;
          仿宋=仿宋;
          楷体=楷体;
          隶书=隶书;
          幼圆=幼圆;
          Andale Mono=andale mono,times;
          Arial=arial, helvetica,
          sans-serif;
          Arial Black=arial black, avant garde;
          Book Antiqua=book antiqua,palatino;
          Comic Sans MS=comic sans ms,sans-serif;
          Courier New=courier new,courier;
          Georgia=georgia,palatino;
          Symbol=symbol;
          Tahoma=tahoma,arial,helvetica,sans-serif;
          Webdings=webdings;
          Wingdings=wingdings,zapf dingbats
        `,
        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,
        // Image
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        Boolean: false,
        // 右下角标志
        branding: false
      }
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {
        return {
          theme: 'modern',
          height: 300 }
      }
    },
    url: {
      default: '',
      type: String
    },
    maxSize: {
      default: 2097152,
      type: Number
    },
    withCredentials: {
      default: false,
      type: Boolean
    },
    // 控制富文本的两种模式，true 为 标准，false为简洁！
    appearance: {
      default: true,
      type: Boolean
    },
    isToken: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init () {
      const self = this
      console.log(this)
      this.Editor = window.tinymce.init({
        // 挂载的DOM对象
        selector: '#editor',
        // 默认配置
        ...this.DefaultConfig,
        // prop内传入的的config
        ...this.config,

        // 图片上传
        images_upload_handler: function (blobInfo, success, failure) {
          if (blobInfo.blob().size >= self.maxSize) {
            failure('文件体积过大')
          }

          // if (self.accept.indexOf(blobInfo.blob().type) > 0) {
          //   uploadPic()
          // } else {
          //   failure('图片格式错误')
          // }
          uploadPic()
          function uploadPic () {
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            xhr.withCredentials = self.withCredentials
            xhr.open('POST', self.url)
            xhr.onload = function () {
              if (xhr.status !== 200) {
                // 抛出 'on-upload-fail' 钩子
                self.$emit('on-upload-fail')
                failure('上传失败: ' + xhr.status)
                return
              }

              const json = JSON.parse(xhr.responseText)
              // 抛出 'on-upload-complete' 钩子
              self.$emit('on-upload-complete', [
                json, success, failure
              ])
            }
            formData.append('file', blobInfo.blob())
            formData.append('sysName', 'cms')
            xhr.send(formData)
          }
        },
        setup: (editor) => {
          // 抛出 'on-ready' 事件钩子
          editor.on(
            'init', () => {
              self.hasInit = true
              self.$emit('on-ready')
              if (self.value) {
                self.setContent(self.value)
              }
            }
          )
          // 抛出 'input' 事件钩子，同步value数据
          editor.on(
            'input change undo redo', () => {
              self.$emit('input', editor.getContent())
            }
          )
        }
      })
    },
    destroyTinymce () {
      if (window.tinymce.get(`editor`)) {
        window.tinymce.get(`editor`).destroy()
      }
    },
    setContent (value) {
      window.tinymce.get(`editor`).setContent(value)
    },
    getContent () {
      window.tinymce.get(`editor`).getContent()
    }
  },
  // watch: {
  //   value (val) {
  //     if (this.hasInit) {
  //       this.$nextTick(() => {
  //         console.log('next1',window.tinymce.get(`${this.Id}`));
  //       })
  //     }
  //   }
  // },
  mounted () {
    this.init()
  },
  activated () {
    this.init()
  },
  deactivated () {
    this.destroyTinymce()
  },
  destroyed () {
    this.destroyTinymce()
  }
}
</script>
