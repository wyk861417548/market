module.exports = {
    getDate:function () {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let ours = date.getHours();    // 获取当前小时数(0-23)
        let min = date.getMinutes();
        let sec = date.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (ours < 10) {
            ours = "0" + ours;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        let time = year+'-'+month+'-'+day+' '+ours+':'+min+':'+sec;
        return time;
    }
}
















