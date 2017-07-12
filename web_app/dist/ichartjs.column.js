(function(b){b.Rectangle=b.extend(b.Component,{configure:function(){b.Rectangle.superclass.configure.apply(this,arguments);this.type="rectangle";this.set({width:0,height:0,value_space:4,value:"",label:{},name:"",tipAlign:"top",valueAlign:"top",shadow_blur:3,shadow_offsety:-1});this.atomic=!0;this.registerEvent("parseText");this.label=null},last:function(a){a.label&&a.label.draw()},doDraw:function(a){a.drawRectangle()},doConfig:function(){b.Rectangle.superclass.doConfig.call(this);var a=this._(),f=a.variable.event,c=a.get("valueAlign");b.taylor.light(a,f);a.width=a.get(a.W);a.height=a.get(a.H);var f=a.push("centerx",a.x+a.width/2),e=a.push("centery",a.y+a.height/2),g=a.C,d="middle",h=a.get("value_space");c==a.L?(g=a.R,f=a.x-h):c==a.R?(g=a.L,f=a.x+a.width+h):c==a.B?(e=a.y+a.height+h,d=a.O):c==a.O&&(e=a.y-h,d=a.B);a.get("label")&&(a.push("label.originx",f),a.push("label.originy",e),a.push("label.text",a.push("value",a.fireString(a,"parseText",[a,a.get("value")],a.get("value")))),b.applyIf(a.get("label"),{textAlign:g,textBaseline:d,color:a.get("color")}),a.label=new b.Text(a.get("label"),a));a.get("tip.enable")&&("follow"!=a.get("tip.showType")&&a.push("tip.invokeOffsetDynamic",!1),a.tip=new b.Tip(a.get("tip"),a))}});b.Rectangle2D=b.extend(b.Rectangle,{configure:function(){b.Rectangle2D.superclass.configure.apply(this,arguments);this.type="rectangle2d";this.set({shadow_offsety:-2})},drawRectangle:function(){var a=this._();a.T.box(a.get(a.X),a.get(a.Y),a.get(a.W),a.get(a.H),a.get("border"),a.get("f_color"),a.get("shadow"))},isEventValid:function(a,b){return{valid:a.x>b.x&&a.x<b.x+b.width&&a.y<b.y+b.height&&a.y>b.y}},tipInvoke:function(){var a=this._();return function(b,c){return{left:a.tipX(b,c),top:a.tipY(b,c)}}},doConfig:function(){b.Rectangle2D.superclass.doConfig.call(this);var a=this._(),f=a.get("tipAlign");f==a.L||f==a.R?a.tipY=function(b,f){return a.get("centery")-f/2}:a.tipX=function(b){return a.get("centerx")-b/2};f==a.L?a.tipX=function(b){return a.x-a.get("value_space")-b}:f==a.R?a.tipX=function(){return a.x+a.width+a.get("value_space")}:a.tipY=f==a.B?function(){return a.y+a.height+3}:function(b,f){return a.y-f-3};a.applyGradient()}});b.Rectangle3D=b.extend(b.Rectangle,{configure:function(){b.Rectangle3D.superclass.configure.apply(this,arguments);this.type="rectangle3d";this.dimension=b._3D;this.set({zHeight:void 0,xAngle:60,yAngle:20,xAngle_:void 0,yAngle_:void 0,shadow_offsetx:2})},drawRectangle:function(){var a=this._();a.T.cube(a.get(a.X),a.get(a.Y),a.get("xAngle_"),a.get("yAngle_"),a.get(a.W),a.get(a.H),a.get("zHeight"),a.get("f_color"),a.get("border.enable"),a.get("border.width"),a.get("light_color"),a.get("shadow"))},isEventValid:function(a,b){return{valid:a.x>b.x&&a.x<b.x+b.get(b.W)&&a.y<b.y+b.get(b.H)&&a.y>b.y}},tipInvoke:function(){var a=this._();return function(b,c){return{left:a.topCenterX-b/2,top:a.topCenterY-c}}},doConfig:function(){b.Rectangle3D.superclass.doConfig.call(this);var a=this._();a.pushIf("zHeight",a.get(a.W));a.topCenterX=a.x+(a.get(a.W)+a.get(a.W)*a.get("xAngle_"))/2;a.topCenterY=a.y-a.get(a.W)*a.get("yAngle_")/2-a.get("value_space");a.get("valueAlign")==a.O&&a.label&&(a.label.push("textx",a.topCenterX),a.label.push("texty",a.topCenterY))}});b.Column=b.extend(b.Chart,{configure:function(){b.Column.superclass.configure.call(this);this.type="column";this.set({coordinate:{},column_width:void 0,column_space:void 0,text_space:6,scaleAlign:"left",sub_option:{},label:{}});this.registerEvent();this.rectangles=[];this.labels=[];this.components.push(this.labels);this.components.push(this.rectangles)},doAnimation:function(a,b,c){var e;c.labels.each(function(a){a.draw()});c.rectangles.each(function(g){e=Math.ceil(c.animationArithmetic(a,0,g.height,b));g.push(c.Y,g.y+(g.height-e));g.push(c.H,e);g.drawRectangle()})},getCoordinate:function(){return this.coo},doLabel:function(a,f,c,e,g){a.labels.push(new b.Text(b.apply(a.get("label"),{id:f,text:c,originx:e,originy:g}),a))},doParse:function(a,b,c,e){a.doActing(a,b,e,c)},engine:function(a){var b=a.get("column_width"),c=a.get("column_space"),e=a.coo.getScale(a.get("scaleAlign")),g=a.coo.valid_height,d=b/2,h=b*(a.get("group_fator")||0),l="complex"!=a.dataType?b+c:a.data.length*b+c+(a.is3D()?(a.data.length-1)*h:0),i=a.coo.get("y_end"),m=i-e.basic*g-(a.is3D()?a.get("zHeight")*(a.get("bottom_scale")-1)/2*a.get("yAngle_"):0),j=c+a.coo.get("x_start"),i=i+a.get("text_space")+a.coo.get("axis.width")[2];a.doEngine(a,b,c,e,g,d,h,l,j,m,i)},doConfig:function(){b.Column.superclass.doConfig.call(this);var a=this._();a.sub=a.is3D()?"Rectangle3D":"Rectangle2D";a.rectangles.length=0;a.labels.length=0;a.rectangles.zIndex=a.get("z_index");a.labels.zIndex=a.get("z_index")+1;a.coo=b.Coordinate.coordinate_.call(a,function(){var b=a.data.length,c=a.get("coordinate.valid_width_value"),e,g,d;"complex"==a.dataType?(d=a.get("labels").length,b=d*b+(a.is3D()?(b-1)*d*a.get("group_fator"):0),e=Math.floor(c/(d+1+b)),g=a.pushIf("column_width",e),d+=1):("stacked"==a.dataType&&(b=a.get("labels").length),e=Math.floor(2*c/(3*b+1)),g=a.pushIf("column_width",e),d=b+1);g*b>c&&(g=a.push("column_width",e));a.push("column_space",(c-g*b)/d);a.is3D()&&(a.push("zHeight",a.get("column_width")*a.get("zScale")),a.push("sub_option.zHeight",a.get("zHeight")),a.push("sub_option.xAngle_",a.get("xAngle_")),a.push("sub_option.yAngle_",a.get("yAngle_")))});a.push("sub_option.width",a.get("column_width"))}});b.Column2D=b.extend(b.Column,{configure:function(){b.Column2D.superclass.configure.call(this);this.type="column2d"},doEngine:function(a,f,c,e,g,d,h,l,i,m,j){var k;a.data.each(function(c,f){k=(c.value-e.start)*g/e.distance;a.doParse(a,c,f,{id:f,originx:i+f*l,originy:m-(0<k?k:0),height:Math.abs(k)});a.rectangles.push(new b[a.sub](a.get("sub_option"),a));a.doLabel(a,f,c.name,i+l*f+d,j)},a)},doConfig:function(){b.Column2D.superclass.doConfig.call(this);this.engine(this)}});b.register("Column2D");b.Column3D=b.extend(b.Column2D,{configure:function(){b.Column3D.superclass.configure.call(this);this.type="column3d";this.dimension=b._3D;this.set({coordinate:{},xAngle:60,yAngle:20,zScale:1,bottom_scale:1.4})},doConfig:function(){b.Column3D.superclass.doConfig.call(this)}});b.register("Column3D");b.ColumnStacked2D=b.extend(b.Column,{configure:function(){b.ColumnStacked2D.superclass.configure.call(this);this.type="columnstacked2d";this.dataType="stacked";this.set({percent:!1,labels:[],sub_option:{label:{color:"#ffffff"},valueAlign:"middle"}})},doEngine:function(a,f,c,e,g,d,h,l,i,m,j){var k,n,o,p=a.get("percent");a.columns.each(function(f,d){k=0;o=p?100/f.total:1;f.item.each(function(c,h){n=(c.value*o-e.start)*g/e.distance;c.total=f.total;a.doParse(a,c,h,{id:d+"_"+h,originx:i+d*l,originy:m-(0<n?n:0)-k,height:Math.abs(n)});k+=n;a.rectangles.push(new b[a.sub](a.get("sub_option"),a))},a);a.doLabel(a,d,f.name,i-0.5*c+(d+0.5)*l,j)},a)},doConfig:function(){b.ColumnStacked2D.superclass.doConfig.call(this);this.engine(this)}});b.register("ColumnStacked2D");b.ColumnStacked3D=b.extend(b.ColumnStacked2D,{configure:function(){b.ColumnStacked3D.superclass.configure.call(this);this.type="columnstacked3d";this.dataType="stacked";this.dimension=b._3D;this.set({percent:!1,sub_option:{label:{color:"#ffffff"},valueAlign:"middle"},coordinate:{},xAngle:60,yAngle:20,zScale:1,bottom_scale:1.4})},doConfig:function(){b.ColumnStacked3D.superclass.doConfig.call(this)}});b.register("ColumnStacked3D");b.ColumnMulti2D=b.extend(b.Column,{configure:function(){b.ColumnMulti2D.superclass.configure.call(this);this.type="columnmulti2d";this.dataType="complex";this.set({labels:[]})},doEngine:function(a,f,c,e,g,d,h,l,i,m,j){var k;a.columns.each(function(d,o){d.item.each(function(c,d){k=(c.value-e.start)*g/e.distance;a.doParse(a,c,d,{id:o+"_"+d,originx:i+d*(f+h)+o*l,originy:m-(0<k?k:0),height:Math.abs(k)});a.rectangles.push(new b[a.sub](a.get("sub_option"),a))},a);a.doLabel(a,o,d.name,i-0.5*c+(o+0.5)*l,j)},a)},doConfig:function(){b.ColumnMulti2D.superclass.doConfig.call(this);this.engine(this)}});b.register("ColumnMulti2D");b.ColumnMulti3D=b.extend(b.ColumnMulti2D,{configure:function(){b.ColumnMulti3D.superclass.configure.call(this);this.type="columnmulti3d";this.dataType="complex";this.dimension=b._3D;this.set({xAngle:60,yAngle:20,zScale:1,group_fator:0.3,bottom_scale:1.4})},doConfig:function(){b.ColumnMulti3D.superclass.doConfig.call(this)}});b.register("ColumnMulti3D");b.Bar=b.extend(b.Chart,{configure:function(){b.Bar.superclass.configure.call(this);this.type="bar";this.set({coordinate:{striped_direction:"h"},bar_height:void 0,bar_space:void 0,text_space:6,scaleAlign:"bottom",sub_option:{},label:{}})},getCoordinate:function(){return this.coo},doLabel:function(a,f,c,e,g){a.labels.push(new b.Text(b.apply(a.get("label"),{id:f,text:c,textAlign:"right",textBaseline:"middle",originx:e,originy:g}),a))},doParse:function(a,b,c,e){a.doActing(a,b,e,c)},engine:function(a){var b=a.get("bar_height"),c=a.get("bar_space"),e=a.coo.getScale(a.get("scaleAlign")),g=a.coo.valid_width,d=b/2,h="complex"!=a.dataType?b+c:a.data.length*b+c,l=a.coo.get("x_start")+e.basic*g,i=a.coo.get(a.X)-a.get("text_space")-a.coo.get("axis.width")[3],m=a.coo.get("y_start")+c;a.doEngine(a,b,c,e,g,d,h,l,i,m)},doAnimation:function(a,b,c){c.labels.each(function(a){a.draw()});c.rectangles.each(function(e){e.push(c.W,Math.ceil(c.animationArithmetic(a,0,e.width,b)));e.drawRectangle()})},doConfig:function(){b.Bar.superclass.doConfig.call(this);var a=this._();a.rectangles=[];a.labels=[];a.rectangles.zIndex=a.get("z_index");a.labels.zIndex=a.get("z_index")+1;a.components.push(a.labels);a.components.push(a.rectangles);a.coo=b.Coordinate.coordinate_.call(a,function(){var b=a.data.length,c=a.get("coordinate.valid_height_value"),e,g,d;"complex"==a.dataType?(d=a.get("labels").length,b=d*b+(a.is3D()?(b-1)*d*a.get("group_fator"):0),e=Math.floor(c/(d+1+b)),g=a.pushIf("bar_height",e),d+=1):("stacked"==a.dataType&&(b=a.get("labels").length),e=Math.floor(2*c/(3*b+1)),g=a.pushIf("bar_height",e),d=b+1);g*b>c&&(g=a.push("bar_height",e));a.push("bar_space",(c-g*b)/d)});a.push("sub_option.height",a.get("bar_height"));a.push("sub_option.valueAlign",a.R);a.push("sub_option.tipAlign",a.R)}});b.Bar2D=b.extend(b.Bar,{configure:function(){b.Bar2D.superclass.configure.call(this);this.type="bar2d"},doEngine:function(a,f,c,e,g,d,h,l,i,m){var j;a.data.each(function(c,f){j=(c.value-e.start)*g/e.distance;a.doParse(a,c,f,{id:f,originy:m+f*h,width:Math.abs(j),originx:l+(0<j?0:-Math.abs(j))});a.rectangles.push(new b.Rectangle2D(a.get("sub_option"),a));a.doLabel(a,f,c.name,i,m+f*h+d)},a)},doConfig:function(){b.Bar2D.superclass.doConfig.call(this);this.engine(this)}});b.register("Bar2D");b.BarStacked2D=b.extend(b.Bar,{configure:function(){b.BarStacked2D.superclass.configure.call(this);this.type="barstacked2d";this.dataType="stacked";this.set({percent:!1,labels:[],sub_option:{label:{color:"#ffffff"},valueAlign:"middle"}})},doEngine:function(a,f,c,e,g,d,h,l,i,m){var j,k,n,o=a.get("percent");a.columns.each(function(d,f){j=0;n=o?100/d.total:1;d.item.each(function(c,i){k=(c.value*n-e.start)*g/e.distance;c.total=d.total;a.doParse(a,c,i,{id:f+"_"+i,originy:m+f*h,originx:l+(0<k?0:-Math.abs(k))+j,width:Math.abs(k)});j+=k;a.rectangles.push(new b.Rectangle2D(a.get("sub_option"),a))},a);a.doLabel(a,f,d.name,i,m-0.5*c+(f+0.5)*h)},a)},doConfig:function(){b.BarStacked2D.superclass.doConfig.call(this);this.push("sub_option.valueAlign",this.C);this.engine(this)}});b.register("BarStacked2D");b.BarMulti2D=b.extend(b.Bar,{configure:function(){b.BarMulti2D.superclass.configure.call(this);this.type="barmulti2d";this.dataType="complex";this.set({labels:[]})},doEngine:function(a,f,c,e,g,d,h,l,i,m){var j;a.columns.each(function(d,n){d.item.each(function(c,d){j=(c.value-e.start)*g/e.distance;a.doParse(a,c,d,{id:n+"_"+d,originy:m+d*f+n*h,width:Math.abs(j),originx:l+(0<j?0:-Math.abs(j))});a.rectangles.push(new b.Rectangle2D(a.get("sub_option"),a))},a);a.doLabel(a,n,d.name,i,m-0.5*c+(n+0.5)*h)},a)},doConfig:function(){b.BarMulti2D.superclass.doConfig.call(this);this.engine(this)}});b.register("BarMulti2D")})(iChart);