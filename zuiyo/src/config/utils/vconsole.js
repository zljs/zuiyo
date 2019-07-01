import VConsole from 'vconsole';
import { parseUA } from '@/config/utils/common_utils.js'

(function () {
    let ua = parseUA()
    if(ua.weixin) new VConsole()
})()
