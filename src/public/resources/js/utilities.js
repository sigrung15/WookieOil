// Update mouse coordinates in settings
function updateMousePosition(e) {
    if (e.offsetX) {
        settings.mouseX = e.offsetX;
        settings.mouseY = e.offsetY;
    } else if (e.layerX) {
        settings.mouseX = e.layerX;
        settings.mouseY = e.layerY;
    }
}

// Clear a canvas
function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Clear and draw the shapes array
function redraw(canvas, context, shapes) {
    // Clear
    clearCanvas(canvas, context);

    // Draw everything in shapes
    for (var i = 0; i < shapes.length; i++) {
        if (shapes[i] !== undefined) {
            shapes[i].draw(context);
        }
    }
}

// Undo
function undo(canvas, context) {
    // Make sure that there is something to undo
    if (settings.shapes.length !== 0) {
        // Pop from shapes
        var shape = settings.shapes.pop();

        // Push to redo
        settings.redo.push(shape);

        // Re-draw image
        redraw(canvas, context, settings.shapes);

    }
}

// Redo
function redo(canvas, context) {
    // Make sure that there is something to redo
    if (settings.redo.length !== 0) {
        // Pop from redo
        var shape = settings.redo.pop();

        // Push to undo
        settings.shapes.push(shape);

        // Re-draw image
        redraw(canvas, context, settings.shapes);
    }
}

// Line segment intersection check
// Reference: Joncom @ GitHub (https://gist.github.com/Joncom)
// https://gist.github.com/Joncom/e8e8d18ebe7fe55c3894
function linesIntersect(line1, line2) {
    var line1DeltaX, line1DeltaY, line2DeltaX, line2DeltaY;
    line1DeltaX = line1.x2 - line1.x1;
    line1DeltaY = line1.y2 - line1.y1;
    line2DeltaX = line2.x2 - line2.x1;
    line2DeltaY = line2.y2 - line2.y1;

    var s, t;
    s = (-line1DeltaY * (line1.x1 - line2.x1) + line1DeltaX * (line1.y1 - line2.y1)) / (-line2DeltaX * line1DeltaY + line1DeltaX * line2DeltaY);
    t = (line2DeltaX * (line1.y1 - line2.y1) - line2DeltaY * (line1.x1 - line2.x1)) / (-line2DeltaX * line1DeltaY + line1DeltaX * line2DeltaY);

    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}