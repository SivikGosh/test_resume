# from langchain.prompts import PromptTemplate
# from langchain.schema.runnable import Runnable
# from langchain_ollama import OllamaLLM

# model = OllamaLLM(model='tinyllama', base_url='http://localhost:11434')

# prompt = PromptTemplate(
#     input_variables=['text'],
#     template='Верни {text} с добавленной к нему строкой "[Improved]".'
# )

# chain: Runnable = prompt | model


# async def improve_text_async(text: str) -> str:
#     return await chain.ainvoke({'text': text})
