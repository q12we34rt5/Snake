<canvas id="myCanvas"></canvas>
<script>
    var blockSize = 15;
    var width = 50;
    var height = 50;
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    canvas.height = width * blockSize;
    canvas.width = width * blockSize;

    for (var i = 0; i < width; i++)
        for (var j = 0; j < height; j++)
            clean(i, j);
    // ------------------------------------------------------------------------------------

    var keyDirection = 0;
    var snakeDirection = 0;
    var x = width / 2, y = height / 2;
    var snakeLen = 5;
    let map = [];
    for (var i = 0; i < width; i++) {
        map[i] = new Array(height);
        for (var j = 0; j < height; j++)
            map[i][j] = 0;
    }
    generateFood();

    var timeoutID = window.setInterval((() => tick()), 70);

    function tick() {
        if (keyDirection == 0 && snakeDirection != 1)
            snakeDirection = 0;
        else if (keyDirection == 1 && snakeDirection != 0)
            snakeDirection = 1;
        else if (keyDirection == 2 && snakeDirection != 3)
            snakeDirection = 2;
        else if (keyDirection == 3 && snakeDirection != 2)
            snakeDirection = 3;
        if (snakeDirection == 0)
            y -= 1;
        else if (snakeDirection == 1)
            y += 1;
        else if (snakeDirection == 2)
            x -= 1;
        else if (snakeDirection == 3)
            x += 1;
        if (y < 0 || y >= height || x < 0 || x >= width || map[x][y] > 0)
            reset();
        var getFood = 0;
        if (map[x][y] == -1) {
            getFood = 1;
            generateFood();
        }
        map[x][y] = snakeLen + 1;
        draw(x, y);
        if (getFood == 1)
            snakeLen++;
        if (getFood == 0)
            for (var i = 0; i < width; i++)
                for (var j = 0; j < height; j++)
                    if (map[i][j] > 0) {
                        map[i][j]--;
                        if (map[i][j] == 0)
                            clean(i, j);
                    }

    }

    // UP : 38
    // DOWN : 40
    // LEFT : 37
    // RIGHT : 39

    function keyFunction() {
        //clean(x, y);
        if (event.keyCode == 38) {
            keyDirection = 0;
        } else if (event.keyCode == 40) {
            keyDirection = 1;
        } else if (event.keyCode == 37) {
            keyDirection = 2;
        } else if (event.keyCode == 39) {
            keyDirection = 3;
        }
        //draw(x, y);
    }
    document.onkeydown = keyFunction;

    function rand(n) {
        return Math.floor(Math.random() * n);
    }

    function generateFood() {
        while (true) {
            var x = rand(width - 4) + 2;
            var y = rand(height - 4) + 2;
            if (map[x][y] == 0) {
                map[x][y] = -1;
                food(x, y);
                break;
            }
        }
    }

    function reset() {
        x = width / 2;
        y = height / 2;
        snakeLen = 5;
        for (var i = 0; i < width; i++)
            for (var j = 0; j < height; j++) {
                if (map[i][j] != 0)
                    clean(i, j);
                map[i][j] = 0;
            }
        generateFood();
    }

    function draw(_x, _y) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#AAAAAA";
        ctx.fillStyle = "#FFFFFF";
        ctx.rect(_x * blockSize, _y * blockSize, blockSize, blockSize);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function food(_x, _y) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#AAAAAA";
        ctx.fillStyle = "#CCCCCC";
        ctx.rect(_x * blockSize, _y * blockSize, blockSize, blockSize);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function clean(_x, _y) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#AAAAAA";
        ctx.fillStyle = "#000000";
        ctx.rect(_x * blockSize, _y * blockSize, blockSize, blockSize);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    
    //var has_init = false;
    //var init_alpha = 0;
    var angle = 12;
    var beta_enable = true;
    var gamma_enable = true;
    //ctx.translate(-width * blockSize / 2, -height * blockSize / 2);
    
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            var alpha = event.alpha, beta = event.beta, gamma = event.gamma;
            if (Math.abs(beta) < angle) {
                beta_enable = true;
            }
            if (Math.abs(gamma) < angle) {
                gamma_enable = true;
            }
            
            if ((!gamma_enable || beta < -Math.abs(gamma)) && -beta >= angle && beta_enable) {
                beta_enable = false;
                keyDirection = 0;
            } else if ((!gamma_enable || beta > Math.abs(gamma)) && beta >= angle && beta_enable) {
                beta_enable = false;
                keyDirection = 1;
            } else if ((!beta_enable || gamma < -Math.abs(beta)) && -gamma >= angle && gamma_enable) {
                gamma_enable = false;
                keyDirection = 2;
            } else if ((!beta_enable || gamma > Math.abs(beta)) && gamma >= angle && gamma_enable) {
                gamma_enable = false;
                keyDirection = 3;
            }
        }, false);
    }

</script>
