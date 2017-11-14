/**
 * Created by admin on 17/11/14.
 */
import '../css/index.css';
// 不适用插件来加载第三方jquery, 会和0.js打包在一起
require(['./common.js', 'jquery'], (common, $) => {
    common.initIndex();
    $(function() {
        console.log('this is jquery');
    })
})