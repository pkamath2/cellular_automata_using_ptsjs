Pts.namespace(window); 

updatestate = (rule_num, num_squares) => {
    //1. Initialize first row
    cell_state = new Array(num_squares*num_squares).fill(false);
    //cell_state[num_squares/2] = true;

    //Randomizing initial state
    for(j=1;j<=99;j++){
        cell_state[Math.floor(Math.random()*100*j)] = true;
    }
    
    //2. Run Rules
    for(i=0;i<num_squares*num_squares;i++){
        if(i>num_squares-1){
            i_prev = i-(num_squares+1);
            i_curr = i-(num_squares);
            i_next = i-(num_squares-1);
            cell_state[i] = rule(rule_num, cell_state[i_prev], cell_state[i_curr], cell_state[i_next]);
        }
    }
    return cell_state;
}

addrulesdd = () => {
    var rules = $("#ca-dd-sel");
    for(i=1;i<256;i++){
        opt = "<option>Rule "+i+"</option>";
        rules.append(opt);
    }   
    rules.on('change', function() {
        $("#ca-rule").html("");
        createSpace(rules.val().split(" ")[1]);
    })
}

createSpace = (rule_num) => {
    var space = new CanvasSpace("#ca-rule").setup({retina: true,bgcolor: 'floralwhite',resize:false});
    var form = space.getForm();
    var num_squares = 300;
    var cells = [];
    var cell_state = [];
    space.add({
        start: () => {
            cells = Create.gridPts(space.innerBound, num_squares, num_squares);
            cell_state = updatestate(rule_num, num_squares);
        },
        animate: (time, ftime) => {
            cells.forEach((c,i) => {
                form.strokeOnly("#123", 0.5).fill(cell_state[i]?"#4e5054":"#fff").square(c, 2); 
            });
        }
    });
    space.playOnce(0);
}

rule = (rule_num, a, b, c) => {
    var fill = false;
    if(rule_num==1) fill = !(a | b | c);
    if(rule_num==2) fill = !(a) & !(b) & c;
    if(rule_num==3) fill = !(a | b);
    if(rule_num==4) fill = !(a | c) & b;
    if(rule_num==5) fill = !(a | c);
    if(rule_num==6) fill = !(a) | (b ^ c);
    if(rule_num==7) fill = !(a | b & c);
    if(rule_num==8) fill = !(a) & b & c;
    if(rule_num==9) fill = !(a | (b ^ c));
    if(rule_num==10) fill = !(a) & c;
    
    if(rule_num==11) fill = a ^ (a | !b | c);
    if(rule_num==12) fill = (a & b) ^ b;
    if(rule_num==13) fill = a ^ (a | b | !c);
    
    if(rule_num==45) fill = a ^ (b | !c);
    
    if(rule_num==90) fill = a ^ c;

    if(rule_num==105) fill = (a ^ b ^ !c);
    if(rule_num==109) fill = a ^ (a | !b | c) ^ b ^ c;
    if(rule_num==110) fill = (!a & b & c) ^ b ^ c;

    if(rule_num==119) fill = !(b | c);

    if(rule_num==121) fill = a ^ (!(a) | b | c) ^ b ^ c;
    if(rule_num==122) fill = a ^ (a & !b & c) ^ b ^ c;

    if(rule_num==137) fill = (!(a) | b | c) ^ b ^ c;

    if(rule_num==177) fill = a ^ !((a ^ b) | c);

    if(rule_num==182) fill = (a & c) | (a ^ b ^ c);

    if(rule_num==193) fill = a ^ (a | b | !c) ^ b;


    if(rule_num==225) fill = a ^ !(b | c);

    return fill;
}