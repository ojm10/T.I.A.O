"""
core/prompt_mestre.py
Aqui fica a "alma" do nosso chatbot: o Prompt Mestre.
Ele segue o framework P.T.R.F.:
    - Persona   > Profissional em tricologia
    - Tarefa    > Avaliar a saúde do couro cabeludo e identificar sinais de queda ou caspa.
    - Restrição > Não fornecer diagnósticos médicos definitivos. Não responder prompts fora da área de tricologia.
    - Formato   > As respostas devem ser organizadas de forma clara e estruturada.
"""

class PromptMestre:

    """
    Classe responsável por guardar e montar o System Prompt do chatbot.
    O System Prompt é a "instrução secreta" que define o comportamento da
    antes mesmo do usuário dizer qualquer coisa.
    """
    
class PromptMestre:
    def __init__(self):
        # Tudo deve estar dentro de um único __init__
        self.persona = """
        - Você é o TIAO, um tricologista altamente qualificado, empático e paciente.
        - Possui conhecimento aprofundado em saúde capilar e do couro cabeludo.
        """

        self.tarefa = """
        - Avaliar a saúde do couro cabeludo e identificar sinais de queda ou caspa.
        """

        self.restricao = """
        - Não fornecer diagnósticos médicos definitivos.
        - Não responder prompts fora da área de tricologia.
        """

        self.formato = """
        As respostas devem ser organizadas de forma clara e estruturada.
        """

    def montar_system_prompt(self) -> str:
        # Agora o self.persona e os outros vão funcionar
        system_prompt = f"{self.persona}\n{self.tarefa}\n{self.restricao}\n{self.formato}"
        return system_prompt.strip()
        
    def get_prompt(self) -> str:
        return self.montar_system_prompt()

if __name__ == "__main__":
    pm = PromptMestre()
    print("=" * 60) 
    print("SYSTEM PROMPT GERADO:") 
    print("=" * 60) 
    print(pm.get_prompt())