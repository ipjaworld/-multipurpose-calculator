let whatIsNowNumber = "";
        let intermediateNumber = "";
        let formula = [];
        let result = 0;

        // 버튼 활성화할 때 살짝 바뀌게
        $(function(){
            $('li').hover(
                function(){ $(this).addClass('number_selected'); },
                function(){ $(this).removeClass('number_selected'); }
            );
        });
       
        // 숫자 버튼 기능
        $(function(){
            $('.number').click(function(){
                if(whatIsNowNumber=="0")whatIsNowNumber = "";
                whatIsNowNumber+=$(this).html();
                // intermediateNumber+=$(this).html();
                console.log(whatIsNowNumber);
                $(resultWindow).html(whatIsNowNumber);
                // $(intermediateFormula).html(intermediateNumber);
            });
        });

        // 클리어 버튼 기능
        $(function(){
            $('.clearButton:eq(1)').click(function(){
                whatIsNowNumber = "";
                intermediateNumber = "";
                console.log(whatIsNowNumber);
                $(intermediateFormula).html(0);
                $(resultWindow).html(0);
            });
            $('.clearButton:eq(0)').click(function(){
                whatIsNowNumber = "";
                $(resultWindow).html(0);
                if($('#intermediateFormula').html().indexOf('=')!=-1){
                    intermediateNumber = "";
                    $(intermediateFormula).html(0);
                }
            });
        });

        // 연산자 기능
        $(function(){
            $('.Operator').click(function(){
                // intermediateNumber += whatIsNowNumber;
                if($('#intermediateFormula').html().indexOf('=')!=-1){
                    intermediateNumber = "";
                    $('#intermediateFormula').html('');
                }
                intermediateNumber += ($('#resultWindow').html()+' '+$(this).html()+' ');
                whatIsNowNumber = "";
                $(intermediateFormula).html(intermediateNumber);
                $(resultWindow).html(0);
                // intermediateNumber ="";
                
            });
        });

        // del 버튼 기능
        $(function(){
            $('.deleteButton').click(function(){
                let resultString = $('#resultWindow').html().toString();
                let cutString = resultString.substring(0, resultString.length - 1);
                if($('#resultWindow').html() == 0) {
                console.log("어라 아무 일도 안했는데 지우시려구요? 아무 일도 일어나지 않습니다~");
                }
                else if($('#intermediateFormula').html().indexOf('=')!=-1){
                    console.log("결과값을 지울 수는 없어요!");
                }
                else if(resultString.length > 1)
                {
                    whatIsNowNumber = cutString;
                    console.log(cutString);
                    console.log(whatIsNowNumber);
                    console.log('del 작업 수행 완료');
    
                }else{
                    whatIsNowNumber = "0";
                }
                $(resultWindow).html(whatIsNowNumber);
            });
        });
    

        // = 버튼 기능
        $(function(){
            $('.equal').click(function(){
                // 현재 표시된 html의 내용의 가장 마지막 내용이 숫자가 아니면 할 수 없다
                if($('#intermediateFormula').html().length)
                if($('#intermediateFormula').html().indexOf('=')!=-1
                    || $('#intermediateFormula').html().indexOf(' ')==-1){
                    console.log("= 명령을 할 수 없어요!");
                }
                else if(!(isNaN($('#intermediateFormula').html().slice(-1))) 
                    && $('#resultWindow').html() == 0){
                    console.log("마지막으로 숫자를 입력!");
                }else{
                    intermediateNumber += $('#resultWindow').html();
                    formula = intermediateNumber.split(' ');
                    result = Number(formula[0]);
                    for(let i=1; i<formula.length; i+=2) {
                        if(formula[i] == '+'){
                            result+=Number(formula[i+1]);
                        }else if(formula[i] == '-'){
                            result-=Number(formula[i+1]);
                        }else if(formula[i] == 'x'){
                            result*=Number(formula[i+1]);
                        }else if(formula[i] == '÷'){
                            result/=Number(formula[i+1]);
                        }else if(formula[i] == '%'){
                            result%=Number(formula[i+1]);
                        }else if(formula[i] == 'xⁿ'){
                            for(let j = 1; j < formula[i+1]; j++){
                                result*=Number(formula[i-1]);
                                console.log(`x(${formula[i-1]})의 n(${formula[i+1]})승은 ${result}입니다`);
                            }
                        }
                    }
                    intermediateNumber += ' = '+result;
                    $(intermediateFormula).html(intermediateNumber);
                    $(resultWindow).html(result);
                    intermediateNumber = result;
                    whatIsNowNumber = result;
                    result = 0;
                }
            });
        });

        // 누르면 바로 실행 되는 버튼 기능 (예시 : 1/x, x²)
        $(function(){
            $('.instantOperator').click(function(){
                // console.log(intermediateNumber);
                result = whatIsNowNumber;
                console.log('instantOperator는'+$(this).html());
                if($(this).html() == '1/x'){
                    result = 1/Number(result);
                }else if($(this).html() == 'x²'){
                    result = Number(result)*Number(result);
                    intermediateNumber = `sqr(${result})`;
                }else if($(this).html() == '√x'){
                    result = Math.sqrt(Number(result));
                    intermediateNumber = `pow(${result})`;
                }else if($(this).html() == 'x!'){
                    result = factorial(Number(result));
                    intermediateNumber = result;
                }
                
                intermediateNumber = result;
                $(intermediateFormula).html(intermediateNumber);
                $(resultWindow).html(result);
                intermediateNumber = "";
                whatIsNowNumber = result;
                result = 0;

            });
        });


        // 팩토리얼 기능
        function factorial(n) {
            return (n != 1) ? n * factorial(n - 1) : 1;
        }

        // 연산자 상황별 계산 기능
        let calculation=()=>{
            result = Number(formula[0]);
            for(let i=1; i<formula.length; i+=2) {
                if(formula[i] == '+'){
                    result+=Number(formula[i+1]);
                }else if(formula[i] == '-'){
                    result-=Number(formula[i+1]);
                }else if(formula[i] == 'X'){
                    result*=Number(formula[i+1]);
                }else if(formula[i] == '÷'){
                    result/=Number(formula[i+1]);
                }else if(formula[i] == '%'){
                    result%=Number(formula[i+1]);
                }else if(formula[i] == '1/x'){
                    result = 1/Number(formula[i+1]);
                }else if(formula[i] == 'x²'){
                    result = Number(formula[i+1])*Number(formula[i+1]);
                    $(intermediateFormula).html(`sqr(${result})`);
                    $(resultWindow).html(result);
                    intermediateNumber = result;
                    whatIsNowNumber = result;
                    result = 0;
                }
            }
            console.log(result);
            return result;
        }