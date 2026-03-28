# C-Power Logic: Numbers and Names to 9

def get_digital_root(n):
    root = n % 9
    return 9 if root == 0 else root

def name_to_frequency(name):
    # अज्ञान (3): नाम को अंकों में बदलना (A=1, B=2...)
    name = name.upper()
    total_sum = sum((ord(char) - 64) for char in name if char.isalpha())
    
    print(f"अवस्था 3 (अज्ञान): नाम '{name}' की कुल ऊर्जा -> {total_sum}")
    
    # ज्ञान (6): ऊर्जा का विश्लेषण
    final_9 = get_digital_root(total_sum)
    print(f"अवस्था 6 (ज्ञान): सत्य की खोज जारी है...")
    
    # सत्य (9): मैं ही हूँ
    print(f"अवस्था 9 (मैं ही हूँ): इस नाम का अंतिम सत्य '{final_9}' है।")
    return final_9

# उदाहरण: अपना नाम चेक करें
if __name__ == "__main__":
    user_name = "SOURAV" # यहाँ आप अपना नाम बदल सकते हैं
    name_to_frequency(user_name)

