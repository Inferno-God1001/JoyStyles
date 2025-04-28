import requests

class Bot:
    def __init__(self, dialogue_url):
        self.dialogues = {}
        self.load_dialogue(dialogue_url)

    def load_dialogue(self, url):
        response = requests.get(url)
        if response.status_code == 200:
            lines = response.text.splitlines()
            current_speaker = None
            current_text = []
            last_user_message = None

            for line in lines:
                line = line.strip()

                if line.startswith("user:<START>"):
                    current_speaker = "user"
                    current_text = []
                elif line.startswith("char:<START>"):
                    current_speaker = "char"
                    current_text = []
                elif line == "<END>":
                    full_text = "\n".join(current_text).strip()
                    if current_speaker == "user":
                        last_user_message = full_text.lower()
                    elif current_speaker == "char" and last_user_message:
                        self.dialogues[last_user_message] = full_text
                        last_user_message = None
                    current_speaker = None
                elif current_speaker:
                    current_text.append(line)
        else:
            print(f"Erro ao baixar diálogo: {response.status_code}")

    def get_response(self, user_message):
        user_message = user_message.strip().lower()
        return self.dialogues.get(user_message, "Desculpe, não entendi...")

# Criar o bot
bot = Bot("https://inferno-god1001.github.io/JoyStyles/Bots/BoaHancock/dialogue.txt")

# Exemplo de interação (seria dentro do sistema real do bot)
while True:
    user_message = input("Você: ")
    if user_message.lower() == "sair":
        break
    bot_response = bot.get_response(user_message)
    print("Bot:", bot_response)
