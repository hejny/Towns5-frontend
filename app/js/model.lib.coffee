
window.drawModel = (ctx, res, s, x_begin, y_begin, rot, slope) ->

  #rot+=40;
  #r(res)

  slope_m=Math.abs(Math.sin(slope/180*pi))
  slope_n=Math.abs(Math.cos(slope/180*pi))*1.4

  s = s * 1.2
  slnko = 10

  res = res.split('::').join(':1,1,1:')
  tmp = res.split(':')
  points = tmp[0]
  polygons = tmp[1]
  colors = tmp[2]
  rot = parseInt(rot) + 45 + parseInt(tmp[3])
  if typeof colors == 'undefined'
    return


  #r(points)
  #r(polygons)

  ###---------------------------Rozklad barev###
  colors = colors.split(',')

  #r(colors)
  #---------------------------Rozklad bodů
  points = points.split('][')
  i = 0
  while points[i]
    points[i] = points[i].split('[').join('')
    points[i] = points[i].split(']').join('')
    points[i] = points[i].split(',')
    i++
  ###---------------------------Rotace###
  i = 0
  while points[i]
    x = parseInt(points[i][0])
    y = parseInt(points[i][1])
    z = parseInt(points[i][2])
    ###-----###
    vzdalenost = Math.sqrt((x - 50) ** 2 + (y - 50) ** 2)
    uhel = Math.acos((x - 50) / vzdalenost)
    uhel = uhel / 3.1415 * 180
    if y < 50
      uhel = uhel + rot
    else
      uhel = uhel - rot
    if 50 - y < 0
      uhel = 180 + 180 - uhel
    x = 50 + Math.cos(uhel / 180 * 3.1415) * vzdalenost
    y = 50 - (Math.sin(uhel / 180 * 3.1415) * vzdalenost)
    x = Math.round(x)
    y = Math.round(y)
    #----Maximální rozsah
    ###if x < 0
      x = 0
    if x > 100
      x = 100
    if y < 0
      y = 0
    if y > 100
      y = 100
    if z < 0
      z = 0
    if z > 250
      z = 250###
    points[i][0] = x
    points[i][1] = y
    points[i][2] = z
    ###---###
    i++
  ###---------------------------Rozklad polygonů###
  polygons = polygons.split(';')
  i = 0
  #for var i=0,l=polygons.length;i<l;i++
  for polygon,i in polygons
    polygon = polygon.split(',')
    polygon.color=colors[i]
    polygons[i]=polygon

  #r(polygons);
  ###---------------------------Seřazení bodů###

  polygons.sort (a,b) ->
    #Poly A
    sum=0
    cnt=0
    i=0
    while a[i]
      if points[a[i]-1]?
        sum+=points[a[i]-1][0]*slope_m+points[a[i]-1][1]*slope_m+points[a[i]-1][2]*slope_n
        cnt++
      i++
    as=sum/cnt
    #
    #Poly B
    sum=0
    cnt=0
    i=0
    while b[i]
        if points[b[i]-1]?
          sum+=points[b[i]-1][0]*slope_m+points[b[i]-1][1]*slope_m+points[b[i]-1][2]*slope_n
          cnt++
        i++
    bs=sum/cnt
    #
    if as>bs
      return 1
    if bs>as
      return -1
    else
      return 0



  ###------------------------------------------------------------------------------------------------------------stin###

  i2 = 0
  l=polygons.length
  while l > i2
    tmppoints = []
    i = 0
    i3 = 0
    while polygons[i2][i3]
      if typeof points[polygons[i2][i3] - 1] != 'undefined'

        z = Math.abs(points[polygons[i2][i3] - 1][2]);

        x = points[polygons[i2][i3] - 1][0]+z/1.5
        y = points[polygons[i2][i3] - 1][1]-z/1.5/2

        xx = x * 1 - (y * 1)
        yy = x * slope_m + y * slope_m

        xxx = x * 1 - (y * 1)
        yyy = x * slope_m + y * slope_m
        tmppoints[i] = s * xx
        i++
        tmppoints[i] = s * yy
        i++
      i3++
    if !tmppoints[4]
      tmppoints[0] = 0
      tmppoints[1] = 0
      tmppoints[2] = 0
      tmppoints[3] = 0
      tmppoints[4] = 0
      tmppoints[5] = 0



    ctx.fillStyle = 'rgba(0,0,0,0.2)'

    ###------------------------Vykreslení bodů###

    ctx.beginPath()
    ctx.moveTo tmppoints[0] + x_begin, tmppoints[1] + y_begin
    i = 2
    while i < tmppoints.length
      ctx.lineTo tmppoints[i] + x_begin, tmppoints[i + 1] + y_begin
      i = i + 2
    ctx.closePath()
    ctx.fill()
    #------------------------
    i2++

  ###---------------------------------------------------------------------------------------------Vykreslení polygonů###

  i2 = 0
  l=polygons.length
  while l > i2
    tmppoints = []
    i = 0
    i3 = 0
    while polygons[i2][i3]
      if typeof points[polygons[i2][i3] - 1] != 'undefined'
        #alert(points[polygons[i2][i3]-1]);
        x = points[polygons[i2][i3] - 1][0]
        y = points[polygons[i2][i3] - 1][1]
        z = points[polygons[i2][i3] - 1][2]


        #if x==-1 && y==-1 && z==0



        xx = x * 1 - (y * 1)
        yy = x * slope_m + y * slope_m - (z * slope_n)

        xxx = x * 1 - (y * 1)
        yyy = x * slope_m + y * slope_m - (z * slope_n)
        tmppoints[i] = s * xx
        i++
        tmppoints[i] = s * yy
        i++
      i3++
    ###if !tmppoints[4]
      tmppoints[0] = 0
      tmppoints[1] = 0
      tmppoints[2] = 0
      tmppoints[3] = 0
      tmppoints[4] = 0
      tmppoints[5] = 0###

    #color = polygons[i2][polygons[i2].length -

    #r(i2)
    color = polygons[i2].color;

    #r(color)
    color=hexToRgb('#'+color);
    #r(color)

    ###----------------------Vystínování polygonu - sklon polygonu###


    if points[polygons[i2][0] - 1]? && points[polygons[i2][2] - 1]?
      x1 = points[polygons[i2][0] - 1][0]
      y1 = points[polygons[i2][0] - 1][1]

      x2 = points[polygons[i2][2] - 1][0]
      y2 = points[polygons[i2][2] - 1][1]

      x = Math.abs(x1 - x2) + 1
      y = Math.abs(y1 - y2) + 1

      plus = Math.log(x / y) * slnko


      if plus<-20
        plus=-20

      if plus>20
        plus=20

      plus=Math.round(plus)

    else
      plus=0

    ###----------------------Vystínování polygonu - propočítání barvy###

    #r(color.r);

    color.r=color.r+plus
    color.g=color.g+plus
    color.b=color.b+plus

    ###------------------------Vystínování polygonu - nastavení barvy###

    #r(plus)
    #r(color.r);



    if color.r > 255
      color.r = 255
    if color.r < 0
      color.r = 0
    if color.g > 255
      color.g = 255
    if color.g < 0
      color.g = 0
    if color.b > 255
      color.b = 255
    if color.b < 0
      color.b = 0


    ctx.fillStyle = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')'

    #r('rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')');
    #r(ctx.fillStyle);
    #r('---');

    ###------------------------Vykreslení bodů###

    ctx.beginPath()
    ctx.moveTo tmppoints[0] + x_begin, tmppoints[1] + y_begin
    i = 2
    while i < tmppoints.length
      ctx.lineTo tmppoints[i] + x_begin, tmppoints[i + 1] + y_begin
      i = i + 2
    ctx.closePath()
    ctx.fill()
    #------------------------
    i2++
  return

###==================================================================================================================###


hexToRgb = (hex) ->

  if !hex?
    hex='000000'

  #hex=hex.toUpperCase();

  # Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) ->
    r + r + g + g + b + b
  )
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  #r(result)
  #r(result[1]);
  #r(parseInt(result[1], 16));

  if result
    r: parseInt(result[1], 16)
    g: parseInt(result[2], 16)
    b: parseInt(result[3], 16)
  else
    r:0
    g:0
    b:0



###--------------------------------------------------------###

rgbToHex = (r, g, b) ->
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)










###--------------------------------------------------------###







