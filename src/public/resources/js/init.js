var settings = {
    viewCanvas: $("#viewCanvas"),
    viewContext: $("#viewCanvas")[0].getContext("2d"),
    editCanvas: $("#editCanvas"),
    editContext: $("#editCanvas")[0].getContext("2d"),
    textarea: $("#textArea"),
    fontSize: 36,
    font: "roboto",
    strokeSize: 10,
    nextObj: "pen",
    nextColor: "black",
    currentObj: undefined,
    selectedShapeIndexes: [],
    moving: false,
    shapes: [],
    redo: [],
    mouseX: 0,
    mouseY: 0
};

// Initialize stuff
$(document).ready(function () {
    // Material select
    $("#fontType").material_select();

    // Initialize minicolors colorpicker
    $("#colorPicker").minicolors();

    // Tooltips
    $(".tooltipped").tooltip({
        delay: 50
    });

    // Resize the canvases
    resize();
});

$(window).on("resize", function () {
    resize();
});

// Update object based on selected tool
$(".tool").on("click", function (e) {
    e.preventDefault();
    settings.nextObj = $(this).attr("data-value");

    // Change color of button
    $(".tool:not(.light-blue accent-1)").addClass("light-blue accent-1");
    $(this).removeClass("light-blue accent-1");
});

// Undo button
$("#undo").on("click", function () {
    undo(settings.viewCanvas[0], settings.viewContext);
});

// Redo button
$("#redo").on("click", function () {
    redo(settings.viewCanvas[0], settings.viewContext);
});

// Stroke size
$("#strokeSize").on("change", function () {
    settings.strokeSize = $(this).val();
});

// Font size
$("#fontSize").on("change", function () {
    settings.fontSize = $(this).val();
});

// Font change
$("#fontType").on("change", function () {
    settings.font = $(this).val();
    settings.textarea.css("font-family", settings.font);
});

// Textarea enter key
$("#textArea").on("keyup", function (e) {
    e.preventDefault();
    var code = (e.keyCode ? e.keyCode : e.which);
    // Enter keycode is 13
    if (code === 13) {
        // Hide text area
        $(this).hide();

        // Make up the font
        var font = settings.fontSize + "px " + settings.font;

        // Create the text
        var text = new Text(settings.mouseX, settings.mouseY + (settings.fontSize / 2), settings.nextColor, $(this).val(), font, settings.fontSize, settings.viewContext);

        // Reset textarea
        $(this).val("");

        // Draw text
        text.draw(settings.viewContext);

        // Add to shapes
        settings.shapes.push(text);

        // Enable undo
        enableUndo(true);
    }
});

// Color change
$("#colorPicker").on("change", function () {
    settings.nextColor = $(this).val();
});