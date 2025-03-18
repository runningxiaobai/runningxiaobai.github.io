document.addEventListener('DOMContentLoaded', function() {  
    // WebP检测函数（保持原有逻辑）  
    const testWebP = () => {  
        const webPData = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';  
        return new Promise(res => {  
            const img = new Image();  
            img.onload = img.onerror = () => res(img.height === 2);  
            img.src = webPData;  
        });  
    }

    // 增强版路径替换函数  
    const replaceImagePath = (str) => {  
        return str.replace(  
            /(src=['"]?)(.*?)(\.)(jpe?g|png)([?'"#]|$)/gi,   
            (match, p1, p2, p3, ext, p5) => {  
                return `${p1}${p2}.webp${p5}`;  
            }  
        );  
    }

    // 主处理函数  
    const convertToWebP = async () => {  
        const isWebPSupported = await testWebP();  
        if (!isWebPSupported) return;

        document.querySelectorAll('img').forEach(img => {  
            // 处理常规属性  
            if (img.src) {  
                img.src = replaceImagePath(img.src);  
            }  
              
            // 处理事件属性  
            const events = ['mouseover', 'mouseout'];  
            events.forEach(event => {  
                const handler = img.getAttribute(`on${event}`);  
                if (handler) {  
                    img.setAttribute(  
                        `on${event}`,   
                        replaceImagePath(handler)  
                    );  
                }  
            });  
        });  
    }

    convertToWebP();  
});  