// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

function rule_45_test(lastRowCells) {
    // will return true if lastRowCells == [1, 0, 1], [0, 1, 1], etc.
    if(lastRowCells[0] == 1) {
        return (lastRowCells[1] == 0 && lastRowCells[2] == 1);
    }
    else {
        return !(lastRowCells[1] == 0 && lastRowCells[2] == 1);
    }
}

// FUN. Draw filled rect.
function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}

//This is how to fill in cells. Just made a random pattern for now
function sample_fill_cell( ctx, fill )
{
    // initialize the starting point (190, 50)
    let x=190, y=50;
    const fill_length = 10;
    fill = fill || 'black';
    ctx.fillStyle = fill;
    for(let i = 0; i<10; i++)
    {
        ctx.fillRect(x, y, fill_length, fill_length);
        x += 10;
        y += 20;          

    }
    ctx.restore();
}

function fill_cells (ctx, cells) {
    ctx.save();

    const cell_length = 1;
    ctx.fillStyle = 'lightgrey';

    cells.forEach((row, rowIndex) => {
        row.forEach(col => {
            ctx.fillRect(col * cell_length, rowIndex * cell_length, cell_length, cell_length);
        })
    })
    
    ctx.restore();
}

function cella_rule_45(ctx) {
    const gridSize = 400;
    const grid = Array.from({length: gridSize}, e => []); // 2d array of all cells
    let lastRow, lastRowCells = [];

    // row iteration
    grid.forEach((row, i) => {
        if(i == 0) {
            row.push(gridSize / 2); // this will fill the 200th column of the first row, assuming 400 gridSize
        }
        else {
            // column iteration
            for(let col = 0; col < gridSize; col++) {
                lastRow = grid[i - 1];
                // console.log(lastRow);

                lastRowCells = [
                    (lastRow.indexOf(col - 1) !== -1)  ? 1 : 0,
                    (lastRow.indexOf(col) !== -1)  ? 1 : 0,
                    (lastRow.indexOf(col + 1) !== -1)  ? 1 : 0 
                ];
                
                // console.log(`${i},${col}: [${lastRowCells[0]}, ${lastRowCells[1]}, ${lastRowCells[2]}]`);
                if(rule_45_test(lastRowCells)) {
                    // console.log(col);
                    row.push(col);
                }
            }
        }
    });

    fill_cells(ctx, grid);
}
