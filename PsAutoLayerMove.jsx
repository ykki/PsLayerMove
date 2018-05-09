docObj = activeDocument;

//check laysets 4 levels deep.
for (i0=0; i0<docObj.layerSets.length; i0++)
{
    //if layerSets[i0] contains layerSets[i1]...
    for (i1=0; i1<docObj.layerSets[i0].layerSets.length; i1++)
    {
        for (i2=0; i2<docObj.layerSets[i0].layerSets[i1].layerSets.length; i2++)
        {
            for (i3=0; i3<docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets.length; i3++)
            {
                for (i4=0; i4<docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets[i3].layerSets.length; i4++)
                {
                    //process layerSets[i0].[i1].[i2].[i3].[i4]
                    if (docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets[i3].layerSets[i4].name.indexOf("$$") > -1)
                    {
                        movObj = docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets[i3].layerSets[i4];
                        refObj = docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets[i3].layerSets[i4-1];

                        ExtractDist(movObj);
                        getBottomPos(refObj);
                        MoveLayerTo(movObj, movObj.bounds[0], refBottom);
                    } 
                }
            //process layerSets[i0].[i1].[i2].[i3]
            if (docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets[i3].name.indexOf("$$") > -1)
                {
                    movObj = docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets[i3];
                    refObj = docObj.layerSets[i0].layerSets[i1].layerSets[i2].layerSets[i3-1];

                    ExtractDist(movObj);
                    getBottomPos(refObj);
                    MoveLayerTo(movObj, movObj.bounds[0], refBottom);
                }  
            }
        //process layerSets[i0].[i1].[i2]
        if (docObj.layerSets[i0].layerSets[i1].layerSets[i2].name.indexOf("$$") > -1)
                {
                    movObj = docObj.layerSets[i0].layerSets[i1].layerSets[i2];
                    refObj = docObj.layerSets[i0].layerSets[i1].layerSets[i2-1];

                    ExtractDist(movObj);
                    getBottomPos(refObj);
                    MoveLayerTo(movObj, movObj.bounds[0], refBottom);
                }  
        }
    //process layerSets[i0].[i1].[i2]
    if (docObj.layerSets[i0].layerSets[i1].name.indexOf("$$") > -1)
                {
                    movObj = docObj.layerSets[i0].layerSets[i1];
                    refObj = docObj.layerSets[i0].layerSets[i1-1];

                    ExtractDist(movObj);
                    getBottomPos(refObj);
                    MoveLayerTo(movObj, movObj.bounds[0], refBottom);
                }  
    }
//process layerSets[i0]
if (docObj.layerSets[i0].name.indexOf("$$") > -1)
{
    movObj = docObj.layerSets[i0];
    refObj = docObj.layerSets[i0-1];

    ExtractDist(movObj);
    getBottomPos(refObj);
    MoveLayerTo(movObj, movObj.bounds[0], refBottom);
}
}


//-------------------------------------
//extract 3 letters after $$ from movObj layer name, then convert to int, and add dist.
function ExtractDist(movObj)
{
var distchr = movObj.name.substr(movObj.name.indexOf("$$")+2,3);
dist = parseInt(distchr,10);
return dist;
}

//-------------------------------------
//acquire refObj bottom position. if refObj is empty then movObj stays the same position.
function getBottomPos(refObj)
{
    if (refObj.bounds[3] == 0)
    {
        refBottom = movObj.bounds[1];
    } else 
    {
        refBottom = parseFloat(refObj.bounds[3],10);
        refBottom += dist;
    }
return refBottom;
}


//-------------------------------------
//move lyr to position lx,ly.
function MoveLayerTo(lyr,lx,ly) 
{
    var Position = lyr.bounds;
    Position[0] = lx - Position[0];
    Position[1] = ly - Position[1];
    lyr.translate(-Position[0],-Position[1]);
}

