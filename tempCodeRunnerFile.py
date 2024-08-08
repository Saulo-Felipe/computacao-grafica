from PIL import Image

# Criar uma nova imagem
img = Image.new('RGB', (500, 500), color='white')
# Definir o pixel na posição (50, 50) para a cor vermelha
img.putpixel((50, 50), (255, 0, 0))
img.show()
