// 工具函数
function showError(message) {
    const errorOverlay = document.querySelector('.error-overlay');
    const errorMessage = document.querySelector('.error-message');
    
    errorMessage.textContent = message;
    errorOverlay.style.display = 'flex';
    
    // 隐藏加载提示
    hideLoading();
    
    console.error(message);
}

function hideError() {
    const errorOverlay = document.querySelector('.error-overlay');
    errorOverlay.style.display = 'none';
}

function hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
}

// Mapbox访问令牌
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid3V5OTQyIiwiYSI6ImNtOGM3dmY0eTE5eTIya29lM2M3ZGp0OGQifQ.A1smKh10z0kscrowYa7fig';

// 初始化地图
mapboxgl.accessToken = MAPBOX_TOKEN;

// 添加错误处理
try {
    // 检查浏览器支持
    if (!mapboxgl.supported()) {
        showError('您的浏览器不支持Mapbox GL');
        throw new Error('浏览器不支持Mapbox GL');
    }
    
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v12', // 使用更自然的地图样式
        center: [-73.9510, 40.7450], // Hunters Point, Long Island City的中心坐标
        zoom: 14.5,
        attributionControl: false, // 隐藏默认的属性控件
        logoPosition: 'bottom-left'
    });

    // 添加导航控件，放在右下角
    map.addControl(new mapboxgl.NavigationControl({
        showCompass: false
    }), 'bottom-right');
    
    // 添加全屏控件
    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    
    // 添加最小化的属性控件
    map.addControl(new mapboxgl.AttributionControl({
        compact: true
    }), 'bottom-left');

    // 错误处理
    map.on('error', (e) => {
        showError(`地图加载错误: ${e.error ? e.error.message : '未知错误'}`);
        console.error('Mapbox 错误详情:', e);
    });

    // 等待地图加载完成
    map.on('load', () => {
        console.log('地图已加载');
        hideLoading();
        
        try {
            // 添加数据源
            map.addSource('points', {
                type: 'geojson',
                data: pointsData
            });

            // 添加访谈地点图层
            map.addLayer({
                id: 'interview-points',
                type: 'circle',
                source: 'points',
                filter: ['==', ['get', 'type'], 'interview'],
                paint: {
                    'circle-radius': 12,
                    'circle-color': '#FF5733', // 橙红色
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });
            
            // 添加住所图层
            map.addLayer({
                id: 'residence-points',
                type: 'circle',
                source: 'points',
                filter: ['==', ['get', 'type'], 'residence'],
                paint: {
                    'circle-radius': 12,
                    'circle-color': '#3366FF', // 蓝色
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });
            
            // 添加标签图层 - 访谈地点
            map.addLayer({
                id: 'interview-labels',
                type: 'symbol',
                source: 'points',
                filter: ['==', ['get', 'type'], 'interview'],
                layout: {
                    'text-field': '访',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 10,
                    'text-allow-overlap': true
                },
                paint: {
                    'text-color': '#ffffff'
                }
            });
            
            // 添加标签图层 - 住所
            map.addLayer({
                id: 'residence-labels',
                type: 'symbol',
                source: 'points',
                filter: ['==', ['get', 'type'], 'residence'],
                layout: {
                    'text-field': '住',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 10,
                    'text-allow-overlap': true
                },
                paint: {
                    'text-color': '#ffffff'
                }
            });

            // 添加鼠标悬停效果 - 访谈地点
            map.on('mouseenter', 'interview-points', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'interview-points', () => {
                map.getCanvas().style.cursor = '';
            });
            
            // 添加鼠标悬停效果 - 住所
            map.on('mouseenter', 'residence-points', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'residence-points', () => {
                map.getCanvas().style.cursor = '';
            });

            // 点击事件处理 - 访谈地点
            map.on('click', 'interview-points', (e) => {
                const features = e.features;
                if (!features.length) return;

                const feature = features[0];
                const { title, description } = feature.properties;
                const coordinates = feature.geometry.coordinates.slice();

                // 更新信息面板
                const pointInfo = document.getElementById('point-info');
                pointInfo.innerHTML = `
                    <div class="point-title">${title}</div>
                    <div class="point-description">${description}</div>
                `;
                
                // 显示信息面板
                document.getElementById('info-panel').classList.add('active');
            });
            
            // 点击事件处理 - 住所
            map.on('click', 'residence-points', (e) => {
                const features = e.features;
                if (!features.length) return;

                const feature = features[0];
                const { title, description } = feature.properties;
                const coordinates = feature.geometry.coordinates.slice();

                // 更新信息面板
                const pointInfo = document.getElementById('point-info');
                pointInfo.innerHTML = `
                    <div class="point-title">${title}</div>
                    <div class="point-description">${description}</div>
                `;
                
                // 显示信息面板
                document.getElementById('info-panel').classList.add('active');
            });
            
            // 添加图例
            const legend = document.createElement('div');
            legend.className = 'map-legend';
            legend.innerHTML = `
                <div class="legend-item">
                    <span class="legend-color" style="background-color: #FF5733;"></span>
                    <span class="legend-label">访谈地点</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background-color: #3366FF;"></span>
                    <span class="legend-label">住所</span>
                </div>
            `;
            document.querySelector('.container').appendChild(legend);
            
            // 添加关闭信息面板的按钮事件
            document.getElementById('close-panel').addEventListener('click', () => {
                document.getElementById('info-panel').classList.remove('active');
            });
            
        } catch (dataError) {
            showError(`加载数据时出错: ${dataError.message}`);
            console.error('数据加载错误:', dataError);
        }
    });
} catch (error) {
    showError(`初始化地图时出错: ${error.message}`);
    console.error('初始化错误详情:', error);
} 